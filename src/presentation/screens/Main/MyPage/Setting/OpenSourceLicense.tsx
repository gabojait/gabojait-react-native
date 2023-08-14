import { Divider, Text } from '@rneui/themed';
import React from 'react';
import { FlatList } from 'react-native';
import { OpensourceLiscenseList } from '../../../../../../opensourceLicense';

interface OpenSourceInfo {
  libraryName: string;
  version: string;
  _license: string;
  _description: string;
  homepage: string;
  repository: { type?: string; url?: string };
  author?: { name?: string; email?: string; url?: string };
  _licenseContent: string;
}

const source = OpensourceLiscenseList;

export default function OpenSourceLicense() {
  const renderItem = ({ item }: { item: OpenSourceInfo }) => {
    return (
      <>
        <Text h4>{item.libraryName}</Text>
        <Text>{item.version}</Text>
        <Text>{item._license}</Text>
        <Text>{item._description}</Text>
        <Text>{item._licenseContent}</Text>
        <Divider />
      </>
    );
  };

  return (
    <>
      <FlatList
        style={{ backgroundColor: 'white' }}
        data={source}
        renderItem={renderItem}
        keyExtractor={item => String(item.libraryName)}
      />
    </>
  );
}
