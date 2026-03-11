import { useCallback, useEffect, useRef, useState } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetScrollView,
    BottomSheetBackdrop,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import { ApiCall } from '../../services/ServiceProvider';

const crDate = new Date();
const CalendarCard = ({ dates = [], calendarRef, navigation }) => {
    const GlobelStyle = useGlobelStyle();
    const [calendarDateList, setCalendarDateList] = useState({});
    const [selected, setSelected] = useState('');

    const isFutureDate = (dateString) => {
        const inputDate = new Date(dateString);
        const today = new Date();

        // Set time to 00:00:00 for an accurate date-only comparison
        inputDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        return inputDate > today;
      };

      const isPastDate = (dateString) => {
        const inputDate = new Date(dateString);
        const firstDay = new Date(crDate.getFullYear(), crDate.getMonth(), 1);

        // Set time to 00:00:00 for an accurate date-only comparison
        inputDate.setHours(0, 0, 0, 0);
        firstDay.setHours(0, 0, 0, 0);

        return inputDate < firstDay;
      };


    useEffect(()=>{
        setCalendarDateList(()=>{
            const data = {};
            dates.forEach(
                (elem, i) => {
                    data[elem.date] = ({ startingDay: (i == 0), endingDay: (i == dates.length - 1), color: (elem.color == 'white' ? '#E9F6FF' : '#FFF'), textColor: ((crDate.getDate() > 5 && isPastDate(elem.date)) || isFutureDate(elem.date)) ? '#aaa' : elem.color == 'white' ? '#004BAC' : '#000', marked: elem.color == 'white' });
                });
            return data;
        });
    }, []);

    const RenderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={1}
                pressBehavior="close"
            />
        ),
        [],
    );

    const onMonthChangeHandler = async (data) => {
        try{
            const resp = await ApiCall(
                {'month':data.month,'year':data.year},
                'AppExpense/noExpenseListApp');
            const dates = resp.datesWithColors;
            setCalendarDateList(()=>{
                const data = {};
                dates.forEach(
                    (elem, i) => {
                        data[elem.date] = ({ startingDay: (i == 0), endingDay: (i == dates.length - 1), color: (elem.color == 'white' ? '#E9F6FF' : '#FFF'), textColor: ((crDate.getDate() > 5 && isPastDate(elem.date) && elem.color != 'white') || isFutureDate(elem.date)) ? '#aaa' : elem.color == 'white' ? '#004BAC' : '#000', marked: elem.color == 'white' });
                    });
                return data;
            });
        }catch(err){
            console.log(err);
        }
    };

    return <BottomSheetModalProvider>
        <BottomSheetModal
            ref={calendarRef}
            index={1}
            animateOnMount={true}
            snapPoints={['1%', '50%']}
            enableContentPanningGesture={false}
            backdropComponent={RenderBackdrop}>
            <BottomSheetView style={GlobelStyle.pd10}>
                <Calendar
                    onDayPress={day => {
                        // setSelected(day.dateString);
                        if(!calendarDateList[day.dateString]?.marked){
                            navigation.navigate('ExpenseAdd', {date:day.dateString});
                        }else{
                            alert('Expense claim submitted already!');
                        }
                    }}
                    onMonthChange={onMonthChangeHandler}
                    markingType={'period'}
                    maxDate={crDate}
                    minDate={(crDate?.getDate() <= 5) ? new Date(crDate.getFullYear(), crDate.getMonth() - 1, 1) : new Date(crDate.getFullYear(), crDate.getMonth(), 1)}
                    markedDates={{
                        ...calendarDateList,
                        [selected]: { color: 'orange', textColor: '#000', marked: true, disableTouchEvent: true, selectedDotColor: 'orange' },
                    }}
                    style={{
                        borderColor: 'gray',
                        height: 350,
                    }}
                    theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#b6c1cd',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#00adf5',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#dd99ee',
                    }}
                />
            </BottomSheetView>
        </BottomSheetModal>
    </BottomSheetModalProvider>;
};

export default CalendarCard;
