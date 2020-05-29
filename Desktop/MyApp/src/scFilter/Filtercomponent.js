import React, {Component} from 'react';
import { StyleSheet, Text, View,ScrollView,Dimensions,AsyncStorage,ActivityIndicator,StatusBar,ImageBackground} from 'react-native';
import {SearchBar} from 'react-native-elements';
import { Table, Row, Rows ,TableWrapper} from 'react-native-table-component';
import Icon from 'react-native-vector-icons/Entypo';

let SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name:'MyApp.db', createFromLocation:'~MyAppDB2.db'},this.openCB, this.errorCB)

class Filter extends Component {
    constructor(props){
        super(props);
        this.state = {
            tableHead: ['STT','Ngày', 'TGBD', 'TGKT', 'Công nhân','Công việc '],
            widthArr: [40,100, 50, 50, 120, 120],
            tableData: 
            [],
            newData: 
            [],
            text:'',
        }
        db.transaction(tx => {
          tx.executeSql('SELECT TenCongViec,TenCongNhan,TGkT,TGBD,Ngay,a.STT FROM SLK a,Works b,Employee c WHERE a.MaCongViec=b.MaCongViec and a.MaCongNhan=c.MaCongNhan order by a.STT asc', [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }
            console.log('temp',temp)
            this.setState({tableData: temp});
            console.log('tableData',this.state.tableData)
            this.setState({newData: temp});
            console.log('newData',this.state.newData)
          });
        });
}
     _searchFilterFunction=text =>{
      this.setState({text});
      console.log('text',text)
      const newData = this.state.tableData.filter(item => {      
        const itemData = `${item.TenCongNhan}`;
         const textData = text.toLowerCase();         
         return itemData.toLowerCase().indexOf(textData) > -1;    
      });    
    
          this.setState({ newData: newData })
          console.log('newdata',this.state.newData)
      
}

    render(){
    const { text } = this.state;
    const state = this.state;
    const newData = this.state.newData;
        
    return(
            <ImageBackground style={styles.containerLogin} source={require('/home/quangtom/MyApp/assets/SC1d8J.jpg')}>
            <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        />  
             <View style={styles.headstyles}>
            <View style={{marginLeft:5}}>
            <Icon style= {{fontSize: 30, color:'white'}} name='menu' onPress={()=>this.props.navigation.openDrawer()}/>
            </View>
            <Text style={styles.headertext}>Tìm kiếm nâng cao</Text>
            </View >
            <SearchBar
             inputStyle={{backgroundColor: 'white',color:'black'}}
             inputContainerStyle={{backgroundColor: 'white'}}
             containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
             placeholder="Nhập tên công nhân để tìm kiếm..."             
             onChangeText={this._searchFilterFunction}
             value={text}
             autoCorrect={false}   />
            
             <ScrollView horizontal={true}>
                
                <View>
                  <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                    <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={{textAlign:'center',fontWeight:'bold'}}/>
                    
                  </Table>
                  <ScrollView style={styles.dataWrapper}>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                      {
                        newData.map((rowData, index) => (
                          <Row
                            key={index}
                            data={Object.values(rowData)}
                            widthArr={state.widthArr}
                            style={[styles.row]}
                            textStyle={styles.text}
                          />
                        ))
                      }
                    </Table>
                  </ScrollView>
                </View>
              </ScrollView>


            </ImageBackground>
             
        )
    }
}
const styles = StyleSheet.create({
    headerSearchButton: {justifyContent :'center',alignItems:'center'},
        headertext: { fontSize: 20, fontWeight: 'bold', color: 'white',marginRight:110},
        headstyles: {  height: 50, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row',marginTop:20},
        containerLogin: {flex: 1,justifyContent: 'center',opacity: 1,backgroundColor: 'rgba(255,0,0,1)'},
        header: { height: 50, backgroundColor: '#537791' },
        text: { textAlign: 'center', fontWeight: '100' },
        dataWrapper: { marginTop: -1 },
        row: { height: 40, backgroundColor: 'white'},
        btn: {  },
        btnText: { textAlign: 'center' , fontWeight: 'bold', fontSize: 15}
      });
export default Filter;
