import React, { useState } from 'react';
import '../../styles/Dashboard.css';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';

export default function Sidebar() {
	const [shrink, setShrink] = useState(false);
	const handleShrink = () => {
		setShrink(!shrink);
	};

	return (
		<div className={shrink ? 'sidebar active' : 'sidebar'}>
			<div className="logo-content" onClick={handleShrink}>
				<div className="logo">
					<i class="bx bxl-kickstarter"></i>
					<div className="logo_name">TrekXplorer</div>
				</div>
				<i class="bx bx-menu" id="btn"></i>
			</div>
			<ul className="list">
				<li>
					<Link to="/company">
						<i class="bx bx-grid-alt"></i>
						<span className="listname">Dashboard</span>
					</Link>
					<span className="tooltip">Dashboard</span>
				</li>
				<li>
					<Link to="/addtour">
						<i class="bx bx-folder-plus"></i>
						<span className="listname">Add Tour</span>
					</Link>
					<span className="tooltip">Add Tour</span>
				</li>
				<li>
					<a href="">
						<i class="bx bx-edit-alt"></i>
						<span className="listname">Manage Tour</span>
					</a>
					<span className="tooltip">Manage Tour</span>
				</li>
				<li>
					<a href="">
						<i class="bx bx-data"></i>
						<span className="listname">View All</span>
					</a>
					<span className="tooltip">View All</span>
				</li>
			</ul>
		</div>
	);
}
