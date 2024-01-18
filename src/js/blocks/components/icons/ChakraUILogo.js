// eslint-disable-next-line no-unused-vars
import * as React from 'react';

const ChakraUILogo = ( props ) => (
	<svg
		viewBox="0 0 804 804"
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		style={ {
			fillRule: 'evenodd',
			clipRule: 'evenodd',
			strokeLinejoin: 'round',
			strokeMiterlimit: 2,
		} }
		{ ...props }
	>
		<path
			d="M803.125 401.563C803.125 179.934 623.191 0 401.562 0 179.934 0 0 179.934 0 401.563c0 221.628 179.934 401.562 401.563 401.562 221.628 0 401.562-179.934 401.562-401.563Z"
			style={ {
				fill: 'url(#a)',
			} }
		/>
		<path
			d="m217.369 418.703 273.725-271.841c5.112-5.078 13.344 1.102 9.89 7.428L399.106 341.016c-2.275 4.162.741 9.243 5.485 9.243h176.062c5.672 0 8.409 6.947 4.263 10.819L276.391 649.022c-5.532 5.162-13.766-2.113-9.324-8.238l146.049-201.478c2.993-4.131.043-9.918-5.06-9.918H221.773c-5.579 0-8.362-6.754-4.404-10.685Z"
			style={ {
				fill: '#fff',
				fillRule: 'nonzero',
			} }
		/>
		<defs>
			<linearGradient
				id="a"
				x1={ 0 }
				y1={ 0 }
				x2={ 1 }
				y2={ 0 }
				gradientUnits="userSpaceOnUse"
				gradientTransform="matrix(0 803.125 -803.125 0 401.562 0)"
			>
				<stop
					offset={ 0 }
					style={ {
						stopColor: '#7bcbd4',
						stopOpacity: 1,
					} }
				/>
				<stop
					offset={ 1 }
					style={ {
						stopColor: '#29c6b7',
						stopOpacity: 1,
					} }
				/>
			</linearGradient>
		</defs>
	</svg>
);

export default ChakraUILogo;
