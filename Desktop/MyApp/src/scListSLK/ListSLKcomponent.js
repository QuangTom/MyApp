import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView,TouchableOpacity,AsyncStorage,ActivityIndicator,StatusBar,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {SearchBar} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import { Table, Row, Rows ,TableWrapper} from 'react-native-table-component';

let SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name:'MyApp.db', createFromLocation:'~MyAppDB2.db'},this.openCB, this.errorCB)

class ListSLK extends Component {
    constructor(props){
        super(props);

       
        this.state = {
            tableHead: ['STT','Ngày', 'TGBD', 'TGKT', 'Công nhân','Công việc '],
            widthArr: [40,100, 50, 50, 120, 120],
            tableData: []
          }
          db.transaction(tx => {
            tx.executeSql('SELECT TenCongViec,TenCongNhan,TGkT,TGBD,Ngay,a.STT FROM SLK a,Works b,Employee c WHERE a.MaCongViec=b.MaCongViec and a.MaCongNhan=c.MaCongNhan order by a.STT asc', [], (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
              }
              console.log('temp',temp)
              this.setState({tableData: temp});
              console.log('tableData1',this.state.tableData)
            });
          });
    }
    _addemployees() {
        this.props.navigation.navigate('AddEmployees')
      }
    render(){
        const state = this.state;
        const tableData = this.state.tableData;
    
     
        return(
          <ImageBackground style={styles.containerLogin} source={require('/home/quangtom/MyApp/assets/SC1d8J.jpg')}>
             <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        />
                <View style={styles.headstyles}>
            
                <Icon style= {{fontSize: 30,color:'white'}} name='menu' onPress={()=>this.props.navigation.openDrawer()}/>
          
                <Text style={styles.headertext}>DANH MỤC SẢN LƯỢNG KHOÁN</Text>

                <Icon style= {{fontSize: 30,color:'white'}} name='plus' onPress={()=>this._addemployees()}/>
                
                </View>
            <ScrollView horizontal={true}>
                
              <View>
                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                  <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={{textAlign:'center',fontWeight:'bold'}}/>
                  
                </Table>
                <ScrollView style={styles.dataWrapper}>
                  <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                    {
                      tableData.map((rowData, index) => (
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
   
    headertext: { fontSize: 20, fontWeight: 'bold', color: 'white'},
    headstyles: {height: 50, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row',marginTop: 20},
    container: { flex: 1,  backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: 'white' },
    btn: {  },
    btnText: { textAlign: 'center' , fontWeight: 'bold', fontSize: 15},
    containerLogin: {flex: 1,justifyContent: 'center',opacity: 1,backgroundColor: 'rgba(255,0,0,1)'},
  });
export default ListSLK;