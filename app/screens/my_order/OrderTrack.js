/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AuthContext } from '../../context/AuthContext';
import API from '../../services/OrderService';
import OrderTrackItem from '../../components/OrderTrackItem';
import { theme } from '../../constants/theme';
import { fetchingMyOrder } from '../../actions/orderActions';

export default function OrderTrack({ navigation }) {
  const [orderList, setOrderList] = useState([]);
  const myOrders = useSelector(state => state.orderReducer.myOrders);
  const isLoading = useSelector(state => state.uiReducer.isLoading);
  const userId = useSelector(state => state.authReducer.userId);
  const dispatch = useDispatch();
  const fectOrder = () => dispatch(fetchingMyOrder(userId));

  const navigationWillFocusListener = navigation.addListener(
    'willFocus',
    () => {
      fectOrder();
    }
  );

  const handleRefresh = () => {
    fectOrder();
  };

  useEffect(() => {
    fectOrder();
    return function cleanup() {
      navigationWillFocusListener.remove();
    };
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: theme.color.lightGray }}>
      <Text>My Order</Text>
      <FlatList
        data={myOrders}
        keyExtractor={item => `order-${item._id}`}
        renderItem={({ item }) => <OrderTrackItem orderItem={item} />}
        refreshing={isLoading}
        onRefresh={handleRefresh}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
}
