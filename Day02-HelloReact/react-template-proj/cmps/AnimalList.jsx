// const { useState, useEffect } = React
export function AnimalList({animals}) {
    // console.log(animals)
    return (
        <header className="animal-list-component">
            <section className="animal-list-container">
                <h1>Rare animals</h1>
                <table>
                <thead>
                        <tr>
                            <th>Type</th>
                            <th>Count</th>
                            <th>Search</th>
                        </tr>
                    </thead>
                    <tbody>
                    {animals.map(animal => (<tr key={animal.type}>
                        <th>{animal.type}</th>
                        <th>{animal.count}</th>
                        <th><a href={`https://www.google.com/search?q=${animal.type}`} target="_blank">Search</a></th>
                        </tr>))}
                    </tbody>
                </table>
            </section>
        </header>
    )
}