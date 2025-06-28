import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	//denominator values to be mapped
	const values = [0.01, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 50, 100, 1000];
	const url = import.meta.env.VITE_SERVER;

	const [selectedCoins, setSelectedCoins] = useState([]);
	const [outputCoins, setOutputCoins] = useState([]);
	const [targetAmount, setTargetAmount] = useState(0.0);

	const handleCheckBoxChange = (val) => {
		setSelectedCoins((prev) => {
			//if prev state already includes val, to remove it, else add it to state.
			return prev.includes(val)
				? prev.filter((value) => value !== val)
				: [...prev, val];
		});
	};

	//to handle parse input as float and store in state.
	const handleInputChange = (e) => {
		let input = e.target.value;
		input = parseFloat(input);
		if (!isNaN(input)) {
			setTargetAmount(input);
		} else {
			setTargetAmount(0);
		}
	};

	//trigger api req to backend, passing targetAmount and selectedCoins as body, retrieving and storing
	//response body into state on successful retrieval of results.
	const handleSubmit = async (e) => {
		console.log(url);
		e.preventDefault();
		console.log(
			`selectedCoins: ${selectedCoins}, targeted amount: ${targetAmount}`
		);

		try {
			const res = await fetch(url + '/api/v1/coinChange', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					targetAmount: targetAmount,
					denominations: selectedCoins,
				}),
			});

			if (!res.ok) {
				throw new Error('API request failed');
			}

			const result = await res.json();
			console.log('results: ', result);
			setOutputCoins(result);
		} catch (error) {
			console.error('error with API req: ', error);
		}
	};

	return (
		<>
			<div>
				<h3 className='mb-5'>Coin Change App</h3>
			</div>
			<div>
				<form>
					<label>Target Amount:</label>
					<div className='input-group mb-3'>
						<div className='input-group-prepend'>
							<span className='input-group-text'>$</span>
						</div>
						<input
							type='text'
							class='form-control'
							aria-label='Amount (to the nearest dollar)'
							placeholder='1 - 9,999.99'
							onChange={(e) => handleInputChange(e)}
						/>
					</div>
					<div className='mt-4'>
						<label>Coin Demoninator:</label>
						<div className='d-flex flex-wrap justify-content-center gap-2 mt-1'>
							{values.map((val, idx) => {
								const id = `btncheck-${idx}`;
								return (
									<div key={id}>
										<input
											type='checkbox'
											className='btn-check'
											id={id}
											autoComplete='off'
											checked={selectedCoins.includes(val)}
											onChange={() => handleCheckBoxChange(val)}
										/>
										<label
											className='btn btn-outline-primary'
											htmlFor={id}>
											{val}
										</label>
									</div>
								);
							})}
						</div>
					</div>
					<button
						type='submit'
						className='btn btn-success mt-4'
						onClick={(e) => handleSubmit(e)}>
						Submit
					</button>
				</form>
			</div>
			<div className='mt-5'>
				<label>Output coins:</label>
				<div className='d-flex flex-wrap justify-content-center gap-2 mt-1'>
					{outputCoins.map((val, idx) => {
						const id = `btncheck-${idx}`;
						return (
							<div>
								<label className='btn btn-primary'>{val}</label>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default App;
