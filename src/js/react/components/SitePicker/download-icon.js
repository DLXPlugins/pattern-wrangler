import React from 'react';
import PropTypes from 'prop-types'; // ES6

const DownloadIcon = ( props ) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			width={ props.width }
			height={ props.height }
		>
			<path
				fill={ props.fill }
				d="M288 32V0h-64v274.7l-73.4-73.4-22.6-22.6L82.7 224l22.6 22.6 128 128 22.7 22.7 22.6-22.6 128-128 22.7-22.7-45.3-45.3-22.6 22.6-73.4 73.4V32zM0 512h512V352H346.5l-45.3 45.3-45.2 45.2-45.3-45.3-45.2-45.2H0v160zm432-56c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24z"
			/>
		</svg>
	);
};
DownloadIcon.defaultProps = {
	width: 16,
	height: 16,
	fill: '#333333',
};

DownloadIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	fill: PropTypes.string,
};

export default DownloadIcon;
