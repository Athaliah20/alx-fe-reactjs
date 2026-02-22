import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p style={{ fontSize: '24px' }}>Current Count: {count}</p>
            <button
                style={{ margin: '5px', padding: '10px 20px', cursor: 'pointer' }}
                onClick={() => setCount(count + 1)}
            >
                Increment
            </button>
            <button
                style={{ margin: '5px', padding: '10px 20px', cursor: 'pointer' }}
                onClick={() => setCount(count - 1)}
            >
                Decrement
            </button>
            <button
                style={{ margin: '5px', padding: '10px 20px', cursor: 'pointer' }}
                onClick={() => setCount(0)}
            >
                Reset
            </button>
        </div>
    );
}

export default Counter;
