import React, { Component } from 'react'
import { 
  View,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Switch,
  KeyboardAvoidingView 
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Redirect } from 'react-router-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPatient, instantiate, queuePatient } from '../../../actions/patient';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import Spinner from 'react-native-spinkit';
import Icon from 'react-native-fontawesome-pro';
import ImagePicker from 'react-native-image-picker';
import Header from '../../../components/Header';
import { IconButton, Button } from '../../../components/Button'
import TextField from '../../../components/TextField'
import InfantSelect from '../../../components/InfantSelect';
import Step from '../../../components/Step'
import Sex from '../../../components/Sex';
import MaritalStatus from '../../../components/MaritalStatus';
import Birthday from '../../../components/Birthday';

const { width, height } = Dimensions.get('window')
const screenWidth = Dimensions.get('window').width

const gradientLayout = {
  colors: ['#19AEFA','#1D9DFF'],
  start: {x: 0.0, y: 1.0},
  end: {x: 1.0, y: 1.0},
  locations: [0, 0.75]
}

const Instruction = ({step}) => {
  switch(step) {
    case 'photo': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Take a picture of patient</Text>
        </View>
      )
    }
    case 'name': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Patient Name</Text>
        </View>
      )
    }
    case 'gender': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Sex</Text>
        </View>
      )
    }
    case 'infant': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Is patient an infant?</Text>
          <Text style={styles.instruction}>{'(< 24 months old)'}</Text>
        </View>
      )
    }
    case 'doba': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Age</Text>
        </View>
      )
    }
    case 'dobi': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Age</Text>
        </View>
      )
    }
    case 'married': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Marital Status</Text>
        </View>
      )
    }
    case 'nationality': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Nationality</Text>
        </View>
      )
    }
    case 'address': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the address</Text>
          <Text style={styles.instruction}>of the patient</Text>
          <Text style={styles.instruction}>Village and Province </Text>
        </View>
      )
    }
    case 'contact': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Phone</Text>
        </View>
      )
    }
    case 'tag': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Tag number</Text>
        </View>
      )
    }
  }
}

const Response = ({step, mutate, handleCameraPress, pictureSource}) => {
  switch(step) {
    case 'photo': {
      return (
        <View style={{justifyContent:'flex-start', alignItems:'center', zIndex:0}}>
          <Button 
              title='From camera' 
              bgColor='#19AEFA' titleColor='#fff' 
              icon='camera'
              width='64%'
              onPress= {handleCameraPress}
            />
          <Image
              source={pictureSource?pictureSource:require('../../../../assets/images/imagePlaceHolder.png')}
              style={{resizeMode: 'cover', marginTop:'6%', height:height*.25, width:height*.25, borderRadius:(height*.25)/2, borderColor: '#f5f5f5', borderWidth: 3}}
            />
        </View>
      )
    }
    case 'name': {
      return (
        <View style={styles.response}>
          <TextField
            placeholder="Name"
            width="80%"
            onChangeText={(regular) => 
              mutate(
                ({profile}) => ({ profile: { ...profile, name: { ...profile.name, regular } }})
              )
          }/>
          <TextField
            placeholder="Khmer Name"
            width="80%"
            onChangeText={(khmer) =>
              mutate(
                ({profile}) => ({ profile: { ...profile, name: {...profile.name, khmer} }})
              )
          }/>
        </View>
      )
    }
    case 'gender': {
      return (
        <View style={styles.response}>
          <Sex onSelect={(sex) => mutate(
            ({profile}) => ({ profile: { ...profile, sex }})
          )}/>
        </View>
      )
    }
    case 'infant': {
      return (
        <View style={styles.response}>
          <InfantSelect onSelect={(answer) => mutate({questions: answer==='Infant'?
          ['photo','tag','name','gender','infant','dobi','nationality']:
          ['photo','tag','name','gender','infant','doba','married','nationality']
          })} />
        </View>
      )
    }
    case 'dobi': {
      const now = new Date();
      return (
        <View style={styles.response}>
          <TextField 
            placeholder="Days"
            width="80%"
            keyboardType="numeric"
            onChangeText={(day) => {
              mutate( ({profile}) => ({ profile: {...profile, dob: profile.dob ? profile.setDate(profile.dob.getDate()-day):new Date(now.getFullYear(), now.getMonth(), now.getDate()-day)}}))
            }}
          />
          <TextField 
            placeholder="Weeks"
            width="80%"
            keyboardType="numeric"
            onChangeText={(week) => {
              mutate( ({profile}) => ({ profile: {...profile, dob: profile.dob ? profile.setDate(profile.dob.getDate()-week*7):new Date(now.getFullYear(), now.getMonth(), now.getDate()-week*7)}}))
            }}
          />
          <TextField 
            placeholder="Months"
            width="80%"
            keyboardType="numeric"
            onChangeText={(month) => {
              mutate( ({profile}) => ({ profile: {...profile, dob: profile.dob ? profile.setMonth(profile.dob.getMonth()+month):new Date(now.getFullYear(), now.getMonth()-month, now.getDate())}}))
            }}
            />
        </View>
      )
    }
    case 'doba': {
      return (
        <View style={styles.response}>
          <TextField 
            placeholder="Age"
            width="80%"
            keyboardType="numeric"
            onChangeText={(age) => {
              mutate( ({profile}) => ({ profile: { ...profile, dob: new Date(`${new Date().getFullYear() - age}-01-01`) }}) )
            }}
          />
        </View>
      )
    }
    case 'married': {
      return (
        <View style={{height: height*.28}}>
          <MaritalStatus onSelect={(status) => mutate(
            ({profile}) => ({ profile: { ...profile, status }})
          )} />
        </View>
      )
    }
    case 'nationality': {
      return (
        <View style={styles.response}>
          <TextField
            placeholder="Nationality"
            width="80%"
            value="Khmer"
            onChangeText={(nationality) =>
              mutate(
                ({profile}) => ({ profile: { ...profile, nationality }})
              )
          }/>
        </View>
      )
    }
    case 'address': {
      return (
        <View style={{...StyleSheet.flatten(styles.response), height: '36%'}}>
          <TextField placeholder="Village name" width="80%"/>
          <TextField placeholder="Province name" width="80%"/>
          <TextField placeholder="Postcode" width="80%"/>
        </View>
      )
    }
    case 'contact': {
      return(
        <View style={styles.response}>
          <TextField
            placeholder="Contact Number"
            width="80%"
            keyboardType="numeric"
          />
        </View>
      )
    }
    case 'tag': {
      return(
        <View style={styles.response}>
          <TextField
            placeholder="Tag Number"
            width="80%"
            keyboardType="numeric"
            onChangeText={(tag) => {
              mutate({tag})
            }}
          />
        </View>
      )
    }
  }
}

const HeaderContainer = ({xOffset, stepsLength}) => (
  <View style={styles.headerContainer}>
    <Header title="Profile" light="true" to="/triage"/>
    <Step allSteps={stepsLength} step={xOffset/screenWidth} backgroundColor='#fff' highlightColor='#FAEB9A' />
  </View>
)
class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      questions: ['photo','tag','name','gender','infant','doba','married','nationality'],
      xOffset:0,
      showSubmit: false,
      profile: {
        picture: null,
        name: {
          regular: '',
          khmer: ''
        },
        sex: '',
        dob: null,
        status: 'inapplicable',
        nationality: 'Khmer',
      },
      tag: '',
      picturePath: null,
      options: {
        title: 'Select Picture',
        quality: 0,
        mediaType: 'photo',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      },
      queueStatus: false
    }
    this.createPatient = props.actions.createPatient
    this.reset = props.actions.instantiate
  }

  handleScroll({nativeEvent: { contentOffset: { x }}}){
    this.setState({ xOffset: x})
    this.refs.responseScroll.scrollTo({x: x, animated:false})
  }

  componentWillUnmount() {
    this.reset()
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content', true)
  }

  handleCameraPress(){
    ImagePicker.showImagePicker(this.state.options, (response) => {    
      if (!response.didCancel && !response.error) {
        const {data, uri} = response
        this.setState(({profile, picturePath}) => ({ profile: { ...profile, picture: data }, picturePath: { uri }}))
      }
    })
  }

  submit() {
    const { profile, tag } = this.state
    this.createPatient(profile, tag)
  }

  render() {
    if(this.props.queueId) {
      return <Redirect to={`/triage/patients/${this.props.queueId}`}/>
    }
    else {
      return (
        <KeyboardAvoidingView style={styles.parentContainer} behavior={'position'}>
          <HeaderContainer xOffset={this.state.xOffset} stepsLength={this.state.questions.length-1}/>
          <ScrollView 
            ref = 'questionScroll'
            horizontal
            pagingEnabled
            onScroll={this.handleScroll}
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator = {false}
            style={styles.questionContainer}
            >
            {this.state.questions.map((step, i) => (
              <View style={{width: screenWidth}} key={i}>
                <Instruction step={step}/>
              </View>
            ))}
          </ScrollView>
          
          <ScrollView 
            ref = 'responseScroll'
            horizontal = {true} 
            pagingEnabled ={true}
            scrollEnabled = {false}
            showsHorizontalScrollIndicator = {false}
            style={styles.responseContainer}
            >
            {this.state.questions.map((step, i) => (
              <View style={{width: screenWidth, justifyContent:'flex-start', paddingHorizontal: 24}} key={i}>
                <Response step={step} mutate={this.setState.bind(this)} pictureSource={this.state.picturePath} handleCameraPress={this.handleCameraPress.bind(this)}/>
              </View>
            ))}
          </ScrollView>

          <View style={{height:'8%'}}>
            <Button 
                  title="Submit" 
                  onPress={this.submit.bind(this)} 
                  bgColor="#1d9dff" titleColor="#fff" 
                  icon="chevron-right"
                  width="50%"
                  round
            />
          </View>
          <Modal
            isVisible={this.props.loading}
            animationIn="fadeIn"
            backdropOpacity={0}
            style={{justifyContent: 'center'}}
          >
            <View style={styles.loading}>
              <Spinner
              isVisible={this.props.loading}
              size={44}
              style={{alignSelf: 'center'}}
              type='Bounce' 
              color='#81e2d9'/>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({createPatient, queuePatient, instantiate}, dispatch)
})

const mapStateToProps = (state) => ({
  loading: state.profile.loading,
  patientId: state.profile.patientId,
  queueId: state.profile.queueId
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f6fb',
  },
  headerContainer: {
    height: '20%',
    justifyContent: 'space-around',
    backgroundColor: '#1D9DFF',
  },
  questionContainer:{
    height: '10%',
    backgroundColor: '#1D9DFF',
  },
  responseContainer:{
    height: '60%',
    backgroundColor: '#f5f6fb',
    paddingTop: 40,
  },
  textWrapper: {
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
  },
  instruction: {
    fontSize: 26,
    fontFamily: 'Nunito-Bold',
    textAlign: 'left',
    color: '#fff',
  },
  response: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  loading: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 88,
    width: 88,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 8
  }
})
