import { cardio } from 'ldrs'
cardio.register()

export default function LoadingPage() {
	return (
		<div className='loader' >
			< l-cardio
				size="60"
				stroke="4"
				speed="2"
				color="black"
			></l-cardio >
		</div>
	)
}
