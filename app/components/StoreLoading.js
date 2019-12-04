import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { View, FlatList } from 'react-native';

export default function StoreLoading() {
  const tempArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <FlatList
      data={tempArr}
      keyExtractor={item => `i-${item}`}
      contentContainerStyle={{ paddingTop: 100, paddingHorizontal: 16 }}
      renderItem={({ item }) => (
        <ContentLoader
          style={{ marginTop: 16 }}
          height={60}
          width={400}
          speed={2}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <Rect x="0" y="0" rx="8" ry="8" width="90%" height="16" />
          <Rect x="0" y="20" rx="5" ry="5" width="30%" height="10" />
        </ContentLoader>
      )}
      ListHeaderComponent={
        <ContentLoader
          height={60}
          width={400}
          speed={2}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <Rect x="0" y="0" rx="5" ry="5" width="90%" height="30" />
          <Rect x="0" y="40" rx="5" ry="5" width="80%" height="10" />
        </ContentLoader>
      }
      ListHeaderComponentStyle={{ marginBottom: 40 }}
    />
  );
}
