const DayList = ({ currentR }) => {
    if (currentR !== null) {
        const days = Object.keys(currentR).filter(key => ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(key));
        return (
            <div>
                {days.map(day => (
                    <div key={day}>
                        <strong>{day}:</strong>
                        <ul>
                            {currentR[day].map((event, index) => (
                                <li key={index}>{event}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    }
}
export default DayList;