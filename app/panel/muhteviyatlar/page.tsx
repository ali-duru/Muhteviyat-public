import { createClient } from '@/utils/supabase/server';

export default async function Muhteviyatlar() {
	const supabase = await createClient();
	const { data: muhteviyatlar } = await supabase.from('muhteviyat').select();

	return (
		<>
			<pre>{JSON.stringify(muhteviyatlar, null, 2)}</pre>;
			{muhteviyatlar?.map((item, index) => (
				<div key={index}>
					{/* Render the properties of each item here */}
					<p>{item.ana_marka}</p>
					<p>{item.alt_marka}</p>
					<p>{item.tanimi}</p>
				</div>
			))}
		</>
	);
}
