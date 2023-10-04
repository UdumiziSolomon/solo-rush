import { Pressable, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { ScaledSheet, ms } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { useLevelPointState } from 'modules/home/state/home-state'

const { width, height } = Dimensions.get('window');

const BestScores = () => {
  const {goBack} = useNavigation<any>();
  const { Easy, Medium, Hard} = useLevelPointState(st => st.state)

  const goBackHandler = (): void => {
    goBack();
  }

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={goBackHandler} style={styles.header}>
        <MaterialCommunityIcons name="keyboard-backspace" size={ms(25)} color={"#fff"} />
      </Pressable>
      <Text style={styles.leaderboardText}>LEADERBOARD</Text>
      <Text style={styles.leaderboardSubText}>Boast about your best scores to your pals!</Text>

      <View style={styles.medalLayer}>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons name="medal-outline" style={styles.medalIcon} />
          <Text style={styles.medalLevel}>Easy</Text>
        </View>
        <Text style={styles.medalPoint}>{Easy}</Text>
      </View>

       <View style={styles.medalLayer}>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome5 name="medal" style={styles.medalIcon} />
          <Text style={styles.medalLevel}>Medium</Text>
        </View>
        <Text style={styles.medalPoint}>{Medium}</Text>
      </View>

      <View style={styles.medalLayer}>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="medal" style={styles.medalIcon} />
          <Text style={styles.medalLevel}>Hard</Text>
        </View>
        <Text style={styles.medalPoint}>{Hard}</Text>
      </View>

    </View>
  )
}

export default BestScores

const styles = ScaledSheet.create({
  wrapper: {
    backgroundColor: "#0d1321",
    flex: 1,
    paddingHorizontal: ms(20),
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ms(20),
    backgroundColor: '#36ac',
    width: ms(50),
    height: ms(50),
    borderRadius: ms(50),
  },
  backText: {
    color: '#fff',
    fontFamily: 'Jose',
    fontSize: ms(16),
    marginLeft: ms(5),
    paddingBottom: ms(3),
  },
  leaderboardText: {
    color: '#e9e9e9',
    fontFamily: 'Young',
    fontSize: ms(22),
    marginTop: ms(20),
    textAlign: 'center',
  },
  leaderboardSubText: {
    color: '#dcdcdccc',
    fontFamily: 'Young',
    fontSize: ms(16),
    textAlign: 'center',
    marginBottom: ms(20),
  },
  medalLayer: {
    width: width - 50,
    borderWidth: 1,
    borderColor: '#7e8288cc',
    marginTop: ms(10),
    borderRadius: ms(10),
    paddingVertical: ms(20),
    paddingHorizontal: ms(15),
    marginVertical: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderStyle: 'dashed',
  },
  medalIcon: {
    color: '#dbdcddcc',
    fontSize: ms(22),
  },
  medalLevel: {
    color: '#dbdcddcc',
    fontFamily: 'Jose',
    fontSize: ms(15),
    marginLeft: ms(10),
  },
  medalPoint: {
    color: '#dbdcddcc',
    fontFamily: 'Jose',
    fontSize: ms(17),
  }
}) 