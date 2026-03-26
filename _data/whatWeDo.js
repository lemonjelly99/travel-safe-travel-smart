export default [
	{
		slug: "education-and-outreach",
		icon: "🎓",
		title: "Education & Outreach",
		excerpt:
			"Engaging, age-appropriate rail safety sessions for schools, youth groups and community organisations.",
		description:
			"<p>We deliver engaging, age-appropriate railway safety sessions to young people in schools and youth organisations, helping them understand the risks and the impact unsafe choices can have on themselves, their families and the wider community.</p>",
		cluster: [
			"School sessions",
			"Youth organisations",
			"Station visits",
			"Digital resources",
		],
		features: [
			{
				icon: "🎓",
				title: "Book a Session",
				text: "We offer free rail safety sessions for schools and youth groups. Sessions are tailored to the age group and can be delivered in-person or online.",
				button: {
					label: "Request a session",
					url: "/contact/",
					style: "primary",
					ariaLabel: "Request a rail safety session",
				},
			},
		],
	},
	{
		slug: "partnership-working",
		icon: "🤝",
		title: "Partnership Working",
		excerpt:
			"Close collaboration with British Transport Police, local councils, schools, charities and community partners.",
		description:
			"<p>Our team works closely with British Transport Police, local councils, schools, charities and community partners to respond to issues, share insights and develop joint solutions that keep people safe around the railway.</p>",
		cluster: ["BTP", "Councils", "Charities", "Multi-agency approach"],
		features: [],
		quotes: [
			{
				text: "The partnership with Travel Safe Travel Smart has been invaluable. Their local knowledge and community relationships mean we can respond more effectively to emerging concerns.",
				credit: "Inspector, British Transport Police",
			},
		],
	},
	{
		slug: "reducing-trespass-and-antisocial-behaviour",
		icon: "🚫",
		title: "Reducing Trespass & ASB",
		excerpt:
			"Targeted interventions at hotspot locations including safety campaigns, school engagement and improved signage.",
		description:
			"<p>We identify hotspot areas and implement targeted interventions — such as safety campaigns, school engagement, signage improvements and community patrols — to reduce trespass, vandalism and antisocial behaviour near the railway.</p>",
		cluster: [
			"Hotspot targeting",
			"Signage &amp; campaigns",
			"Community patrols",
		],
		features: [
			{
				icon: "📊",
				title: "60% reduction",
				text: "In trespass incidents at Lewes station over six months following a targeted campaign.",
			},
			{
				icon: "🏫",
				title: "45 schools reached",
				text: "During Rail Safety Week 2025, with over 5,000 young people taking part.",
			},
		],
		quotes: [],
	},
	{
		slug: "incident-and-community-support",
		icon: "🚨",
		title: "Incident & Community Support",
		excerpt:
			"Risk assessment, coordinated responses and clear communication when safety concerns arise.",
		description:
			"<p>When safety concerns arise, we work with local partners to assess risk and coordinate effective responses, ensuring communities receive the support and information they need.</p>",
		cluster: [],
		features: [],
		quotes: [],
	},
	{
		slug: "community-initiatives",
		icon: "🌍",
		title: "Community Initiatives",
		excerpt:
			"Local safety days, national awareness campaigns and events that build trust and empower communities.",
		description:
			"<p>From local safety days to national campaigns, we take part in events that raise awareness, build connections and empower communities to stay safe around the railway.</p>",
		cluster: [],
		features: [],
		quotes: [],
		buttons: [
			{
				label: "Contact us about an event",
				url: "/contact/",
				style: "primary",
			},
			{ label: "View latest news", url: "/news/", style: "outline" },
		],
	},
];
