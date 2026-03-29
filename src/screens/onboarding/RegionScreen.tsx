import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { regionsByLanguage } from '../../data/mockData';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useAppState } from '../../state/AppStateContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Region'>;

const regionCodes: Record<string, string> = {
  Mexico: 'MX',
  'Costa Rica': 'CR',
  Guatemala: 'GT',
  Colombia: 'CO',
  'Puerto Rico': 'PR',
  Spain: 'ES',
  Brazil: 'BR',
  Portugal: 'PT',
  France: 'FR',
  Quebec: 'QC',
  Belgium: 'BE',
  Senegal: 'SN',
  Kanto: 'KA',
  Kansai: 'KS',
  Kyushu: 'KY',
  Seoul: 'SE',
  Busan: 'BS',
  Jeju: 'JJ',
};

export function RegionScreen({ navigation }: Props) {
  const {
    state: {
      onboarding: { language, regions },
    },
    toggleRegion,
    setAllRegions,
  } = useAppState();

  const regionOptions = language ? regionsByLanguage[language] ?? [] : [];
  const allSelected = regionOptions.length > 0 && regionOptions.every((item) => regions.includes(item));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.topBar}>
          <Pressable style={styles.backArrowButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#A5ADC6" />
          </Pressable>
        </View>

        <View style={styles.iconTile}>
          <Ionicons name="location-outline" size={34} color="#6E5BE3" />
        </View>

        <Text style={styles.title}>Target Countries / Regions</Text>
        <Text style={styles.subtitle}>Select one or more regions that interest you most</Text>

        <View style={styles.listWrap}>
          {!language ? (
            <Text style={styles.warning}>Choose a language first to view region options.</Text>
          ) : (
            <>
              <Pressable
                style={[styles.option, allSelected && styles.optionSelected]}
                onPress={() => setAllRegions(allSelected ? [] : regionOptions)}
              >
                <View style={styles.optionLeft}>
                  <View style={styles.codePill}>
                    <Ionicons name="checkmark-done-outline" size={18} color="#59586B" />
                  </View>
                  <Text style={styles.optionText}>Select all regions</Text>
                </View>
                <View style={[styles.radioOuter, allSelected && styles.radioOuterSelected]}>
                  {allSelected ? <Ionicons name="checkmark" size={14} color="#FFFFFF" /> : null}
                </View>
              </Pressable>

              {regionOptions.map((item) => {
                const selected = regions.includes(item);
                return (
                  <Pressable
                    key={item}
                    style={[styles.option, selected && styles.optionSelected]}
                    onPress={() => toggleRegion(item)}
                  >
                    <View style={styles.optionLeft}>
                      <View style={styles.codePill}>
                        <Text style={styles.codeText}>{regionCodes[item] ?? 'RG'}</Text>
                      </View>
                      <Text style={styles.optionText}>{item}</Text>
                    </View>
                    <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
                      {selected ? <Ionicons name="checkmark" size={14} color="#FFFFFF" /> : null}
                    </View>
                  </Pressable>
                );
              })}
            </>
          )}
        </View>

        <View style={styles.actions}>
          <Pressable
            style={[styles.buttonBase, regions.length > 0 ? styles.buttonEnabled : styles.buttonDisabled]}
            disabled={regions.length === 0}
            onPress={() => navigation.navigate('Genre')}
          >
            <Text style={[styles.buttonText, regions.length > 0 ? styles.buttonTextEnabled : styles.buttonTextDisabled]}>
              Next
            </Text>
          </Pressable>

          <View style={styles.footer}>
            <View style={styles.dots}>
              <View style={styles.dot} />
              <View style={[styles.dot, styles.dotActive]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F111A',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 6,
    paddingBottom: 12,
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    alignItems: 'flex-start',
  },
  backArrowButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTile: {
    width: 76,
    height: 76,
    borderRadius: 18,
    backgroundColor: '#1D2232',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    marginBottom: 14,
  },
  title: {
    color: '#F3F5FF',
    fontSize: 23,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#A5ADC6',
    fontSize: 15,
    marginBottom: 12,
    textAlign: 'center',
  },
  listWrap: {
    width: '100%',
    gap: 8,
    flex: 1,
  },
  warning: {
    fontSize: 14,
    color: '#A5ADC6',
    textAlign: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A3145',
    backgroundColor: '#171C2A',
  },
  option: {
    width: '100%',
    backgroundColor: '#171C2A',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#2A3145',
    paddingHorizontal: 14,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionSelected: {
    borderColor: '#7A6CFF',
    backgroundColor: '#1C2040',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flexShrink: 1,
  },
  codePill: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#232A3D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeText: {
    color: '#C1C8DF',
    fontWeight: '700',
    fontSize: 14,
  },
  optionText: {
    color: '#F3F5FF',
    fontSize: 16,
    fontWeight: '500',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#4A5270',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#171C2A',
  },
  radioOuterSelected: {
    borderColor: '#7A6CFF',
    backgroundColor: '#7A6CFF',
  },
  actions: {
    width: '100%',
    marginTop: 'auto',
  },
  buttonBase: {
    width: '100%',
    borderRadius: 19,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonEnabled: {
    backgroundColor: '#7A6CFF',
  },
  buttonDisabled: {
    backgroundColor: '#4B4869',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
  },
  buttonTextEnabled: {
    color: '#FFFFFF',
  },
  buttonTextDisabled: {
    color: '#CBC5E4',
  },
  footer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3D4562',
  },
  dotActive: {
    width: 30,
    borderRadius: 8,
    backgroundColor: '#7A6CFF',
  },
});
