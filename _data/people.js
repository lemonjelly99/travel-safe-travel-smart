export default [
	{
		id: "jane-smith",
		name: "Jane Smith",
		role: "Community Safety Manager",
		area: "Kent",
		email: "jane.smith@networkrail.co.uk",
		phone: "07700 900123",
		photo: "/assets/img/people/jane-smith.jpg",
		bio: "Jane has worked in community safety across Kent for over 8 years, building strong partnerships with schools and local councils.",
		lat: 51.27,
		lng: 0.52,
		coverage: {
			type: "Feature",
			properties: { name: "Kent" },
			geometry: {
				type: "Polygon",
				coordinates: [
					[
						[0.04, 51.09],
						[0.04, 51.48],
						[1.45, 51.39],
						[1.43, 51.05],
						[0.04, 51.09],
					],
				],
			},
		},
	},
	{
		id: "mark-johnson",
		name: "Mark Johnson",
		role: "Community Safety Manager",
		area: "Sussex",
		email: "mark.johnson@networkrail.co.uk",
		phone: "07700 900456",
		photo: "/assets/img/people/mark-johnson.jpg",
		bio: "Mark specialises in education outreach and has delivered safety sessions to over 200 schools across Sussex.",
		lat: 50.83,
		lng: -0.14,
		coverage: {
			type: "Feature",
			properties: { name: "Sussex" },
			geometry: {
				type: "Polygon",
				coordinates: [
					[
						[-0.95, 50.73],
						[-0.95, 51.1],
						[0.04, 51.09],
						[0.35, 50.78],
						[-0.95, 50.73],
					],
				],
			},
		},
	},
	{
		id: "sarah-williams",
		name: "Sarah Williams",
		role: "Community Safety Manager",
		area: "South London & Surrey",
		email: "sarah.williams@networkrail.co.uk",
		phone: "07700 900789",
		photo: null,
		bio: "Sarah focuses on reducing trespass and antisocial behaviour at hotspot locations across South London and Surrey.",
		lat: 51.35,
		lng: -0.17,
		coverage: {
			type: "Feature",
			properties: { name: "South London & Surrey" },
			geometry: {
				type: "Polygon",
				coordinates: [
					[
						[-0.51, 51.15],
						[-0.51, 51.45],
						[0.04, 51.48],
						[0.04, 51.09],
						[-0.51, 51.15],
					],
				],
			},
		},
	},
	{
		id: "tom-reynolds",
		name: "Tom Reynolds",
		role: "Senior Community Safety Manager",
		area: "South East Region",
		email: "tom.reynolds@networkrail.co.uk",
		phone: "07700 900321",
		photo: "/assets/img/people/tom-reynolds.jpg",
		bio: "Tom oversees community safety strategy across the South East and coordinates multi-agency partnerships.",
		// No lat/lng — this person won't appear on the map but will appear in the list
	},
	{
		id: "emily-chen",
		name: "Emily Chen",
		role: "Content Editor",
		area: null,
		email: "emily.chen@networkrail.co.uk",
		photo: null,
		bio: "Emily manages the Travel Safe Travel Smart website and produces educational resources.",
		// Not a CSM — will be filtered out of the CSM Finder
	},
	{
		name: "Nick Turner",
		role: "Community Safety Manager",
		phone: "01234 567890",
		email: "nick.turner@networkrail.co.uk",
	},
	{
		name: "Nicola Dorris",
		role: "Community Safety Manager",
		phone: "01234 567890",
		email: "nicola.dorris@networkrail.co.uk",
	},
];
