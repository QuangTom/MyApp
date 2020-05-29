import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar,TouchableOpacity,AsyncStorage,Alert,Image,ToastAndroid, ImageBackground} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

let SQLite = require('react-native-sqlite-storage')
let db = SQLite.openDatabase({name: 'MyApp.db', createFromLocation : "~MyAppDB2.db", location: 'Library'}, this.openCB, this.errorCB);

class Registration extends Component{
    constructor(props){
      super(props);
      this.state = {numberHolder: 1,username:'',macn:'',password:'',repassword:''}

    }
    render(){
      return(
        <ImageBackground style={styles.containerLogin} source={require('/home/quangtom/MyApp/assets/SC1d8J.jpg')}>
             <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        />
        <View style={{flexDirection:'row',justifyContent:'center',}}>
          <Image source={require('/home/quangtom/MyApp/assets/lo-tanca.png')} style={{height:100,width:100, borderRadius:60 }}/>
          </View>
             <Text style ={{fontSize: 28, textAlign: 'center',margin: 10,color: 'white'}}>NHẬT KÝ</Text>
          <Text style ={styles.login}>SẢN LƯỢNG KHOÁN</Text>
          <TextInput style={styles.textInput} 
          placeholder="Tên đăng nhập" 
          placeholderTextColor= "#336699"
          onChangeText={(username)=>this.setState({username})} 
          value={this.state.username}/>
           <TextInput style={styles.textInput} 
          placeholder="Mã công nhân" 
          placeholderTextColor= "#336699"
          onChangeText={(macn)=>this.setState({macn})} 
          value={this.state.macn}/>
          <TextInput style={styles.textInput} 
          placeholder="Mật khẩu" 
          placeholderTextColor= "#336699"
          onChangeText={(password)=>this.setState({password})} 
          value={this.state.password}
          secureTextEntry={true}/>
          <TextInput style={styles.textInput}
          placeholder="Nhập lại mật khẩu"
          placeholderTextColor= "#336699"
          onChangeText={(repassword)=>this.setState({repassword})}
          value={this.state.repassword}
          secureTextEntry={true}
          />
       <View style = {styles.buttonLoginView}>
        <TouchableOpacity style= {styles.buttonLogin} onPress={this._regis}>
          <Text style={styles.buttonLoginText}>ĐĂNG KÝ</Text>
        </TouchableOpacity>
        </View>
        <View style = {styles.buttonLoginView}>
        <TouchableOpacity style= {styles.buttonExit} onPress={this._back}>
        <Text style={styles.buttonLoginText}>QUAY LẠI</Text>
        </TouchableOpacity>
        </View>
        </ImageBackground>
      );
    }
    _back = ()=> {
        this.props.navigation.navigate('Login')
    }
    componentDidMount(){
      var randomNumber = Math.floor(Math.random() * 100) + 1;
      this.setState({ numberHolder: randomNumber })
      console.log('numberholder',this.state.numberHolder)
    }

  _regis = () => {
    const  username  = this.state.username; 
    const  macn  = this.state.macn; 
    const  password  = this.state.password;
    const  repassword = this.state.repassword;
    const  stt = this.state.numberHolder;
    const  matk = this.state.numberHolder;

if (password==repassword){
  if (username) {
      if (macn) {
        if (password) {
          db.transaction((tx) => {
            var sql = 'INSERT INTO Users (STT,MaTaiKhoan,TenTaiKhoan, MaCongNhan, MatKhau) VALUES (?,?,?,?,?)';
            var pram = [stt,matk,username, macn, password];
                console.log('pram',pram)
            tx.executeSql(sql,pram,(tx,results) => {
                          var len = results.rowsAffected;
                          if (len > 0) {
                            ToastAndroid.show('Đăng ký thành công',ToastAndroid.SHORT)
                            this.props.navigation.navigate('Login');
                          }
                            else {
                              ToastAndroid.show('Đăng ký thất bại',ToastAndroid.SHORT);
                          }
            });
              });

                  } else {  
          ToastAndroid.show('Mật khẩu không được để trống',ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show('Mã công nhân không được để trống',ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Tên đăng nhập không được để trống',ToastAndroid.SHORT);
    }
    } else {
      ToastAndroid.show('Mật khẩu không trùng khớp',ToastAndroid.SHORT);
    }
  };
  errorCB(err) {
    ToastAndroid.show("SQL Error: "+ err, ToastAndroid.SHORT)
  }

  successCB() {
    ToastAndroid.show("SQL executed: ", ToastAndroid.SHORT)
  }

  openCB() {
    console.log("Open database");
  }
  
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    containerLogin: {flex: 1,justifyContent: 'center',opacity: 1,backgroundColor: 'rgba(255,0,0,1)'},
    containerFeedBack: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerFeedBack2: {
      justifyContent: 'flex-start',
    },
    containerCatchUp: {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      
    },
    header: {
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: '#f2c252',
      justifyContent: 'space-between',
    
    },
    headerNewStories: {
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      paddingTop: 20,
      paddingBottom: 20,
      backgroundColor: '#f2c252',
      justifyContent: 'space-between',
    },
    headerMyProfile:{
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      paddingTop: 20,
      paddingBottom: 20,
      backgroundColor: '#f2c252',
      justifyContent: 'flex-start',
    },
    headerTitle: {
      flexDirection: 'column',
      
    },
    headerListButton: {
      width: 55,
      justifyContent :'center',
      alignItems:'center',
    },
    headerSearchButton: {
      // width: 40,
      justifyContent :'center',
      alignItems:'center',
  
    },
    headerMoreButton: {
      // width: 40,
      justifyContent :'center',
      alignItems:'center',
    },
    content: {
      flexDirection: 'row',
      backgroundColor: '#edf2ef',
      borderTopWidth: 0.5,
      borderTopColor: 'white',
    },
    content1: {
      flex: 1,
      paddingLeft: 3,
  
    },
    contentText1: {
      fontSize: 17,
      flex: 1,
      fontWeight:'500',
    },
    contentText2: {
      fontSize: 13,
      fontStyle: 'italic',
      flex: 1,
    },
    contentText3: {
      fontSize: 13,
      flex: 1,
    },
    title: {
      alignSelf: 'flex-start',
      fontWeight: '600',  
      fontSize: 18,
    },
    title2: {
      alignSelf: 'flex-start',
      fontWeight: '400',
      fontSize: 16,
    },
    top: {
    },
    bottom: {
      flex: 1,
    },
    icon: {
      alignItems: 'center',
    },
    areas: {
      width: 60,
      backgroundColor: '#f7dfa8',
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentNearText: {
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 16,
    },
    screenStyles: {
    },
    textInput: {
      margin: 15,
      height: 40,
      padding: 5,
      fontSize: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#336699',
      color:'white'
      
    },
    buttonLogin: {
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: '#336699',
      alignItems: 'center',
      height: 50,
      width: 200,
      borderRadius: 10,
    },
    buttonExit: {
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: '#336699',
      alignItems: 'center',
      height: 50,
      width: 140,
      borderRadius: 10,
    },
    login: {
      fontSize: 28,
      textAlign: 'center',
      margin: 10,
      fontWeight: 'bold',
      color: 'white'
    },
    buttonLoginText: {
      color: 'white',
      fontWeight: 'normal',
      fontSize: 20,
    },
    buttonLoginView: {
      marginTop: 10,
      marginBottom: 20,
      flexDirection: 'column',
      alignItems: 'center',
    },
    buttonFeedBackView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }, 
    feedbackText:{
      fontSize: 20,
      textAlign:'center',
    },
  });
  export default Registration;
