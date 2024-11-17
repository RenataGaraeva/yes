import React, { useEffect, useState } from 'react';

export default function Layout () {

    const [animals,setAnimals] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    let getCategoryAndNames = async () => {
        try {
            let response = await fetch('https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available')

            if(!response.ok) {
                throw new Error('Ошибка сети')
            }
            let uppgradedList = await response.json()

            if (Array.isArray(uppgradedList)) {
                setAnimals(uppgradedList)
            } else {
                setError("Получены некорректные ответы от сервера")
            }
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCategoryAndNames()
    }, [])

    if (loading) {
        return <div>Загрузка...</div>;
    }
    if (error) {
        return <div>Ошибка: {error.message}</div>;
    }

    return (
        <>
            {animals.map(animal => (
                    <div key={animal.id}>
                        <div key={animal.id}>
                            {'Имя животного: ' + animal.name}
                        </div>
                        <div key={animal.id}>
                            {'Вид животного: ' + animal.category.name}
                        </div>
                    </div>
                )
            )}
        </>
    )
}