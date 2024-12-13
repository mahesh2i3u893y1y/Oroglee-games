

const ranks = [
    {
        id: 1,
        rank: "1",
        child: {
            name: "mahesh",
            school: "Keshava reddy"
        },
        score: "1200",
        streak: "2"
    },
    {
        id: 2,
        rank: "2",
        child: {
            name: "mahesh",
            school: "Keshava reddy"
        },
        score: "1200",
        streak: "2"
    },
    {
        id: 3,
        rank: "3",
        child: {
            name: "mahesh",
            school: "Keshava reddy"
        },
        score: "1200",
        streak: "2"
    },
    {
        id: 4,
        rank: "4",
        child: {
            name: "mahesh",
            school: "Keshava reddy"
        },
        score: "1200",
        streak: "2"
    },
    {
        id: 5,
        rank: "5",
        child: {
            name: "mahesh",
            school: "Keshava reddy"
        },
        score: "1200",
        streak: "2"
    },
    {
        id: 6,
        rank: "6",
        child: {
            name: "mahesh",
            school: "Keshava reddy"
        },
        score: "1200",
        streak: "2"
    },
    {
        id: 7,
        rank: "7",
        child: {
            name: "mahesh",
            school: "Keshava reddy"
        },
        score: "1200",
        streak: "2"
    },
    {
        id: 8,
        rank: "8",
        child: {
            name: "mahesh",
            school: "Keshava reddy"
        },
        score: "1200",
        streak: "2"
    },
    {
        id: 9,
        rank: "9",
        child: {
            name: "mahesh",
            school: "Keshava reddy"
        },
        score: "1200",
        streak: "2"
    },
    {
        id: 10,
        rank: "10",
        child: {
            name: "mahesh",
            school: "Keshava reddy"
        },
        score: "1200",
        streak: "2"
    },
    {
        id: 11,
        rank: "11",
        child: {
            name: "mahesh",
            school: "Keshava reddy"
        },
        score: "1200",
        streak: "2"
    },


]

const ViewRank = () => {
    return (
        <div className="w-full">
            {
                ranks.map((each) => (
                    <div key={each.id} className="flex justify-between items-center border border-gray-200 px-2 md:px-5 py-2 rounded-lg mb-1">
                        <p>{each.rank}</p>
                        <div className="flex flex-col justify-center ">
                            <p>{each.child.name}</p>
                            <p>{each.child.school}</p>
                        </div>
                        <div className="flex justify-center items-center">
                            <img src="https://cdn.pixabay.com/photo/2022/04/22/11/38/gold-7149584_1280.png" alt="points" className="h-10 w-10" />
                            <p>{each.score}</p>
                        </div>
                        <div className="flex justify-center items-center ">
                            <img src="https://cdn.vectorstock.com/i/500p/03/49/burning-fire-icon-isolated-on-white-vector-51200349.jpg" alt="streak" className="w-10 h-10" />
                            <p>{each.streak}</p>

                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ViewRank