import React, { useRef, useState } from 'react';
import {
    View,
    FlatList,
} from 'react-native';

import WalkthroughCard from '../../components/modules/authentication/WalkthroughCard';
import WalkthroughFooter from '../../components/modules/authentication/WalkthroughFooter';
import { slides } from '../../utils/slides';
import WalkthroughHeader from '../../components/modules/authentication/WalkthroughHeader';
import { WalkthroughStyles as styles } from '../../styles';

const WalkthroughPage: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
        }
        // else {
        //     navigation.navigate('Home' as never); // Replace 'Home' with your main screen name
        // }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
        }
    };

    const handleViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    return (
        <View style={styles.container}>
            <WalkthroughHeader />
            <FlatList
                ref={flatListRef}
                data={slides}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <WalkthroughCard item={item} styles={styles} />
                )}
                onViewableItemsChanged={handleViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            />
            <WalkthroughFooter currentIndex={currentIndex} handleNext={handleNext} slides={slides} styles={styles} handlePrevious={handlePrevious} />
        </View>
    );
};

export default WalkthroughPage;