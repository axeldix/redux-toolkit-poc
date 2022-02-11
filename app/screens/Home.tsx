/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import {
  fetchContacts,
  selectContactsAvailable,
  selectContactsData,
  selectContactsError,
  selectContactsLoading,
} from '../slices/contactsSlice';
import {useDispatch, useSelector} from 'react-redux';
import { fetchLogin } from '../slices/loginSlice';

const Home = () => {
  const data = useSelector(selectContactsData);
  const isLoading = useSelector(selectContactsLoading);
  const available = useSelector(selectContactsAvailable);
  const error = useSelector(selectContactsError);

  const dispatch = useDispatch();

  const handleFetchData = async () => {
    dispatch(fetchContacts());
  };
  
  const handleLogin = async () => {
    dispatch(fetchLogin());
  };

  return (
    <SafeAreaView>
      <View
        style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{margin: 20}}>
          <Text>Let's learn about Redux!</Text>
        </View>
        <View style={{margin: 20}}>
          <Button title="Press Me to fetch data!" onPress={handleFetchData} />
        </View>
        
        <View style={{margin: 20}}>
          <Button title="Press Me to Login!" onPress={handleLogin} />
        </View>
        {isLoading ? (
          <View style={{margin: 20}}>
            <Text>Cargando...</Text>
          </View>
        ) : (
          <View style={{margin: 20}}>
            {available
              ? data.map((user, index) => (
                  <View key={index}>
                    <Text>{user.name}</Text>
                  </View>
                ))
              : null}

            {error && (
              <View>
                <Text>ocurrió un error: {error}</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
