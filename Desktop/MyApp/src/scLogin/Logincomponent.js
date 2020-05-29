import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,TouchableOpacity,AsyncStorage,Alert,BackHandler, ImageBackground,Dimensions, ToastAndroid,StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {SearchBar} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';

let SQLite = require('react-native-sqlite-storage')
let db = SQLite.openDatabase({name: 'MyApp.db', createFromLocation : "~MyAppDB2.db", location: 'Library'}, this.openCB, this.errorCB);

class Login extends Component{
    constructor(props){
      super(props);
      this.state = {username:'',password:''}
    }
    render(){
      return(
        
          <ImageBackground style={styles.containerLogin } source={require('/home/quangtom/MyApp/assets/SC1d8J.jpg')}>
           <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        />
          <View style={{flexDirection:'row',justifyContent:'center',}}>
          <Image source={require('/home/quangtom/MyApp/assets/lo-tanca.png')} style={{height:100,width:100, borderRadius:60 }}/>
          </View>
          <Text style ={{fontSize: 28, textAlign: 'center',marginTop: 30,color: 'white'}}>NHẬT KÝ</Text>
          <Text style ={styles.login}>SẢN LƯỢNG KHOÁN</Text>
          <TextInput style={styles.textInput} 
          placeholder="Tên đăng nhập"
          placeholderTextColor= "#336699"
          onChangeText={(username)=>this.setState({username})} 
          value={this.state.username}
         
          />
          <TextInput style={styles.textInput} 
          placeholder="Mật khẩu" 
          placeholderTextColor= "#336699"
          onChangeText={(password)=>this.setState({password})} 
          value={this.state.password}
          secureTextEntry={true}/>
           <View>
        <TouchableOpacity style= {{marginLeft: 20}} onPress={this._registration}>
        <Text style={{color: 'white', textDecorationLine: "underline", fontWeight: '700',paddingTop:5,paddingBottom:30}}>Chưa có tài khoản ?</Text>
        </TouchableOpacity>
        </View>
       <View style = {styles.buttonLoginView}>
        <TouchableOpacity style= {styles.buttonLogin} onPress={this._signIn}>
          <Text style={styles.buttonLoginText}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
        </View>
        <View style = {styles.buttonLoginView}>
        <TouchableOpacity style= {styles.buttonExit} onPress={this._backPressed}>
        <Text style={styles.buttonLoginText}>THOÁT</Text>
        </TouchableOpacity>
        </View>
        </ImageBackground>
      );
    }
  _registration = () => {
    this.props.navigation.navigate('Registration')
  }
   _backPressed = () => {
    Alert.alert(
      'Thông báo',
      'Bạn có muốn thoát ứng dụng không ?',
      [
        {text: 'Không', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Có', onPress: () => BackHandler.exitApp()},
      ],
      { cancelable: false });
      return true;
  }
  _signIn = ()=> {

    db.transaction((tx) => {
      var sql = 'SELECT TenTaiKhoan,MatKhau,PhongBan FROM Users,Employee WHERE TenTaiKhoan=\'' + this.state.username + '\' and Users.MaCongNhan=Employee.MaCongNhan';
          console.log("Query completed");
          
      tx.executeSql(sql,[],(tx,results) => {
        var len = results.rows.length;
        if (len ==0)  
          ToastAndroid.show('Tài khoản không tồn tại',ToastAndroid.SHORT);
        else {
          var row = results.rows.item(0);
          console.log("TTK",row.TenTaiKhoan)
          console.log("MK",row.MatKhau)
          console.log("PB",row.PhongBan)
      
          if (this.state.password==row.MatKhau && row.PhongBan=='Kỹ thuật')
          {
            ToastAndroid.show('Đăng nhập thành công',ToastAndroid.SHORT);
            this.props.navigation.navigate('ListSLK',{screen: 'Profile',prams: {TenTaiKhoan:this.state.username},});
          }
          else if (this.state.password==row.MatKhau && row.PhongBan!='Kỹ thuật')
          {
            ToastAndroid.show('Đăng nhập thành công',ToastAndroid.SHORT);
            this.props.navigation.navigate('CheckIn',{TenTaiKhoan:this.state.username});
          }
          else if (this.state.password!=row.MatKhau)
          {
            ToastAndroid.show('Sai tài khoản hoặc mật khẩu',ToastAndroid.SHORT)
          };
        }
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
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    containerLogin: {
      flex: 1,
      justifyContent: 'center',
      opacity: 1,
      backgroundColor: 'rgba(255,0,0,1)'
    },
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
  export default Login;
