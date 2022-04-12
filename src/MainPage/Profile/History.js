import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import HistroyCard from '../HistroyCard';

const HistoryList = [
    {
        id: 1,
        date: 1648123456,
        KetoneDiff: 123,
        HeartRate: 456,
        Cal: 1478
    },
    {
        id: 2,
        date: 1648803888,
        KetoneDiff: 123,
        HeartRate: 456,
        Cal: 1478
    },
    {
        id: 3,
        date: 1648803900,
        KetoneDiff: 321,
        HeartRate: 456,
        Cal: 158
    },
    {
        id: 4,
        date: 1648845688,
        KetoneDiff: 10,
        HeartRate: 456,
        Cal: 8888
    }
]

export default function History({ needRender = true }) {

    const [renderList, setrenderList] = useState([])

    useEffect(() => {
        if (!needRender) {
            setrenderList(HistoryList.slice(0, 3))
        }
    }, [needRender])


    const renderView = () => {
        switch (needRender) {
            case false:
                return (
                    <>
                        {renderList.map((item, i) => <HistroyCard item={item} key={i} />)}
                    </>
                )
            default:
                return (
                    <FlatList
                        data={HistoryList}
                        renderItem={HistroyCard}
                        keyExtractor={(item) => item.id}
                    />
                )
        }
    }

    return (
        <>
            {renderView()}
        </>
    )
}