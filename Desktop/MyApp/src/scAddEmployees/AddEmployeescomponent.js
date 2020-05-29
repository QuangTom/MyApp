import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView,TouchableOpacity,AsyncStorage,ActivityIndicator,StatusBar,TouchableHighlight, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome';
import {SearchBar} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import { Table, Row, Rows ,TableWrapper} from 'react-native-table-component';

let SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name:'MyApp.db', createFromLocation:'~MyAppDB2.db'},this.openCB, this.errorCB)

class AddEmployees extends Component {
    constructor(props){
        super(props); 
         
        this.state = {
          tableHead: ['STT', 'Mã công nhân', 'Tên công nhân','Phòng ban','Chức vụ'],
          widthArr: [40, 70, 110, 85,85],
          tableData: [],
          pressed: false,
          backgroundColor:''
          }
        
          db.transaction(tx => {
            tx.executeSql('SELECT ChucVu,PhongBan,TenCongNhan,MaCongNhan,STT FROM Employee order by STT asc', [], (tx, results) => {
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
    
    errorCB(err) {
      ToastAndroid.show("SQL Error: "+ err, ToastAndroid.SHORT)
    }
  
    successCB() {
      ToastAndroid.show("SQL executed: ", ToastAndroid.SHORT)
    }
  
    openCB() {
      console.log("Open database");
    }
    _addworks() {
        this.props.navigation.navigate('Addworks')
      }
    _listSLK() {
        this.props.navigation.navigate('ListSLK')
    }
    _changeColor(){
      if(!this.state.pressed){
        this.setState({ pressed: true,backgroundColor: 'red'});
     } 
    }
    render(){
      const state = this.state;
      const tableData = this.state.tableData;
  console.log('tableData2',tableData)
   
      return(
        
        <ImageBackground style={styles.containerLogin} source={require('/home/quangtom/MyApp/assets/SC1d8J.jpg')}>
             <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        />
              <View style={styles.headstyles}>
              <Text style={styles.headertext}>THÊM CÔNG NHÂN</Text>
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
                      console.log('rowData',rowData),
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
          <View style ={{flexDirection: 'row',justifyContent:'space-between'}}>
          
          <TouchableOpacity style = {{ justifyContent:'flex-start',flexDirection:'row'}} onPress={() => this._listSLK()}>
           <Icon name={"ios-arrow-back"}  size={60} color="white" />
            <View style={{flexDirection:'column',justifyContent:'center'}}>
             <Text style={{fontSize:20, color:"white"}}>Quay lại</Text>
             </View>
          </TouchableOpacity>
        
          <TouchableOpacity style = {{ justifyContent:'flex-end',flexDirection:'row'}} placeholder onPress={() => this._addworks()}>
          <View style={{flexDirection:'column',justifyContent:'center'}}>
          <Text style={{fontSize:20, color:"white"}}>Xác nhận</Text>
          </View>
           <Icon name={"ios-arrow-forward"}  size={60} color="white"/>
          </TouchableOpacity>
          </View>
        </ImageBackground>
      )
  }
   
}
const styles = StyleSheet.create({
   
    headertext: { fontSize: 20, fontWeight: 'bold', color: 'white'},
    headstyles: { height: 50, alignItems: "center", justifyContent: 'center',marginTop:20},
    container: { flex: 1,  backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center'},
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: 'white'},
    btn: {  },
    btnText: { textAlign: 'center' , fontWeight: 'bold', fontSize: 15},
    containerLogin: {flex: 1,justifyContent: 'center',opacity: 1,backgroundColor: 'rgba(255,0,0,1)'},
  });
export default AddEmployees;