import React, { useEffect } from 'react'
import { increment, decrement, incrementByAmount, selectCount, fetchImages } from '../redux/counter/counterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'


export default function Counter() {
    //const count =  useSelector(selectCount);
    const { count, loading, error, images } = useSelector((state: RootState) => state.counter);
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchImages())
    }, [])


    return (
        <div style={{ display: 'flex' }}>
            <div>
                <button onClick={() => dispatch(decrement())}>-</button>
            </div>
            <div>{count}</div>
            <div>
                <button onClick={() => dispatch(increment())}>+</button>
                <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
            </div>
            {loading && <div>Loading</div>}
            <pre style={{ textAlign: 'left' }}>{JSON.stringify(images, null, 4)}</pre>
        </div>
    )
}
