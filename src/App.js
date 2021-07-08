import React, { useState, useEffect } from 'react';


function App () {

    const [repositories, setRepositories] = useState([]);

    const [location, setLocation] = useState({});



    useEffect(() => {
        async function fetchData () {
            const reponse = await fetch('https://api.github.com/users/mmjck/repos');

            const data = await reponse.json();
            console.log(data);
            setRepositories(data);
        }
        fetchData();
    }, []);


    useEffect(() => {
        async function fetchLocation () {
            const watchId = navigator.geolocation.watchPosition(handlePosition)

            return navigator.geolocation.clearWatch(watchId);

        }
        fetchLocation();
    }, []);

    function handlePosition ({ coords }) {
        console.log('cordenadas', coords);

        const { latitude, longitude } = coords;

        setLocation({ latitude, longitude });
    }


    useEffect(() => {
        async function isFavorite () {
            const filtered = repositories.filter(item => item.favorite);
            document.title = `Você tem ${filtered.length} favorito(s)`
        }
        isFavorite();
    }, [repositories]);

    function handleFavorities (id) {
        const newRepositories = repositories.map(item => {
            return item.id === id ? { ...item, favorite: !item.favorite } : item;
        });

        setRepositories(newRepositories);
    }

    return (
        <>
            <div>
                <p>Latitude {location.latitude}</p>

                <p>Longitude {location.longitude}</p>
            </div>
            <ul>
                {repositories.map(item => (
                    <li key={item.id}>
                        {item.name}
                        {item.favorite && <span>Favorito</span>}
                        <button onClick={() => handleFavorities(item.id)}>Favoritar</button>
                    </li>)
                )}

            </ul>
        </>

    );
}

export default App;
