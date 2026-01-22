import { useEffect, useState, version } from "react";

function CitySearchBar({ onSelectedCity }) {

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [city, setCity] = useState(null);
    const [active, setActive] = useState(0);



    const handleCity = (e) => {
        setQuery(e.target.value);
    }

    useEffect(() => {
        if (query.length >= 2) {
            fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5`)
                .then(response => response.json())
                .then(data => {
                    console.log(data.results);
                    setSuggestions(data.results)
                }
                );
        } else {
            setSuggestions([]);
            onSelectedCity(null)
            setCity(null)
        }
    }, [query]);

    const handleKeydown = (e) => {
        if (e.key === "ArrowDown") {
            setActive((active + 1) % suggestions.length);
            e.preventDefault();
        }

        if (e.key === "ArrowUp") {
            setActive((active - 1 + suggestions.length) % suggestions.length);
            e.preventDefault();
        }

        if (e.key === "Enter") {
            const item = suggestions[active];
            setCity(item);
            setSuggestions([]);
            if (onSelectedCity) {
                onSelectedCity(item);
            }
        }
    };

    return <>
        <div>
            <input type="text" value={query} onChange={handleCity} placeholder="Enter City" onKeyDown={handleKeydown}
                style={{ width: "100%" }}
            />
            {
                suggestions && suggestions.length > 0 && (
                    <ul className="autocomplete">
                        {
                            suggestions.map((item, i) => (<li className="autocomplete-item"
                                key={item.id}
                                onClick={() => {
                                    setCity(item);
                                    setSuggestions([]);
                                    if (onSelectedCity) {
                                        onSelectedCity(item);
                                    }
                                }}
                                style={{
                                    background: i === active ? "#f0f0f0" : "transparent",
                                    fontWeight: i === active ? "bold" : "normal"
                                }}
                            >
                                {`${item.name},${item.admin2},${item.admin1},${item.country}`}
                            </li>))
                        }
                    </ul>
                )
            }
            {
                city && (<p>Selected city: {city.name}, lat {city.latitude}, long {city.longitude}</p>)
            }
        </div>
    </>
}

export default CitySearchBar;