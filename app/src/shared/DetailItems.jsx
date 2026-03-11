import React, { useState } from 'react';
import { Text, View, Image, FlatList, Linking, TouchableOpacity } from 'react-native';
import styles from '../core/assets/Style/styles';
import ImageViewer from 'react-native-image-viewing';
import { ImageModal } from '../core/components/ConfirmationModal/ConfirmationModal';
import FastImage from 'react-native-fast-image';

export const DetailItem = ({ label, value }) => (
    <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value || '--'}</Text>
    </View>
);





export const DocumentInformation = ({ headLabel, label, value, url, url_back }) => {
    const [visible, setvisible] = useState(false);
    const [visibleback, setvisibleback] = useState(false);
    return (
        <View style={styles.Documentcontainer}>
            <Text style={styles.heading}>{headLabel}</Text>
            {
                url && (
                    <View style={styles.imageContainer}>

                        <TouchableOpacity onPress={() => setvisible(true)}>
                            <FastImage
                                source={{ uri: url }}
                                style={styles.documentImage}
                            />
                        </TouchableOpacity>

                        <ImageModal modalVisible={visible} setModalVisible={setvisible} url={url} />

                    </View>

                )
            }

            {
                url_back && (
                    <View style={styles.imageContainer}>
                        <TouchableOpacity onPress={() => setvisibleback(true)}>
                            <Image
                                source={{ uri: url_back }}
                                style={styles.documentImage}
                            />
                        </TouchableOpacity>

                        <ImageModal modalVisible={visibleback} setModalVisible={setvisibleback} url={url_back} />

                    </View>
                )
            }



            {
                label && <Text style={styles.label}>{label}</Text>
            }
            {
                value && <Text style={styles.value}>{value}</Text>
            }

        </View>
    );
};


export const BankInformation = ({ data = [], headLabel, url }) => {
    const [visible, setvisible] = useState(false);
    return (
        <View style={styles.BankInformationContainer}>
            <Text style={styles.heading}>{headLabel}</Text>

            {
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return <View style={styles.infoRow}>
                            <Text style={styles.label}>{item.label}</Text>
                            <Text style={styles.value}>{item.value}</Text>
                        </View>;
                    }}

                    keyExtractor={item => item.id}
                />
            }
            {/* {
                data.map((itm) => {
                    return (
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>{itm.label}</Text>
                            <Text style={styles.value}>{itm.value}</Text>
                        </View>
                    )
                })
            } */}




            {
                url && (<View style={styles.imageContainer}>
                    <TouchableOpacity onPress={() => setvisible(true)}>
                        <Image
                            source={{ uri: url }} // Replace with your actual image URI or local asset
                            style={styles.bankImage}

                        />


                    </TouchableOpacity>

                    <ImageModal modalVisible={visible} setModalVisible={setvisible} url={url} />

                </View>)
            }

        </View>
    );
};







