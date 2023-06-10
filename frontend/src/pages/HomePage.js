import './HomePage.css'
function HomePage() {
    return (
        <div className="HomePage">
            <div className="AboutWeb">
                <h1>About</h1>
                <p>Experience the power of MyGymRoutine, an innovative online platform that enables fitness enthusiasts to personalize and design their perfect workout plan. Utilizing an intuitive interface, users can effortlessly create, organize, and monitor custom gym routines that cater to their unique objectives and preferences. Seize command of your fitness voyage with MyGymRoutine, and effortlessly attain your desired fitness milestones.</p>
            </div>
            <div className="FutureFeatures">
                <h1>Feature that coming soon</h1>
                <ul>
                    <li>1. Enhance Search functionality to enable targeted exercise selection based on specific muscle groups.</li>
                    <li>2. Make a 30 days exercise week</li>
                    <li>3. Include additional details for exercises, such as the number of repetitions and the duration or timing.</li>
                </ul>
            </div>
        </div>
    )
};
export default HomePage;