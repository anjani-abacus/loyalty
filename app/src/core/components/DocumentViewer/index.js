import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';

export default function DocumentViewer({route}) {
  const {url} = route?.params;
  const [path, setPath] = useState(null);

  useEffect(() => {
    const localPath = `${RNFS.DocumentDirectoryPath}/temp.pdf`;
    RNFS.downloadFile({ fromUrl: url, toFile: localPath }).promise
      .then(() => setPath(localPath))
      .catch(err => console.log('Download error:', err));
  }, []);

  if (!path) {return null;}

  return (
    <View style={styles.container}>
      <Pdf
        source={{ uri: `file://${path}` }}
        style={styles.pdf}
        onError={err => console.log('PDF error:', err)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  pdf: { flex: 1, width: Dimensions.get('window').width },
});
