

export function leveluser(levelup) {
	let role = {
		rank: 'Bronze I',
		name: 'Bronze',
		id: 1
	};
	if (levelup <= 25) {
		role = { rank: 'Bronze I', name: 'Bronze', id: 1 };
	} else if (levelup <= 50) {
		role = { rank: 'Bronze II', name: 'Bronze', id: 2 };
	} else if (levelup <= 100) {
		role = { rank: 'Bronze III', name: 'Bronze', id: 3 };
	} else if (levelup <= 150) {
		role = { rank: 'Silver I', name: 'Silver', id: 1 };
	} else if (levelup <= 200) {
		role = { rank: 'Silver II', name: 'Silver', id: 2 };
	} else if (levelup <= 275) {
		role = { rank: 'Silver III', name: 'Silver', id: 3 };
	} else if (levelup <= 350) {
		role = { rank: 'Gold I', name: 'Gold', id: 1 };
	} else if (levelup <= 450) {
		role = { rank: 'Gold II', name: 'Gold', id: 2 };
	} else if (levelup <= 600) {
		role = { rank: 'Gold III', name: 'Gold', id: 3 };
	} else if (levelup <= 800) {
		role = { rank: 'Platinum I', name: 'Platinum', id: 1 };
	} else if (levelup <= 1000) {
		role = { rank: 'Platinum II', name: 'Platinum', id: 2 };
	} else if (levelup <= 1300) {
		role = { rank: 'Diamond I', name: 'Diamond', id: 1 };
	} else if (levelup <= 1600) {
		role = { rank: 'Diamond II', name: 'Diamond', id: 2 };
	} else if (levelup <= 2000) {
		role = { rank: 'Master', name: 'Master', id: 1 };
	} else {
		role = { rank: 'GrandMaster', name: 'GrandMaster', id: 1 };
	}
	return role;
}