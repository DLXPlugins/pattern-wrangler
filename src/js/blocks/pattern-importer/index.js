import { registerBlockType, createBlock } from '@wordpress/blocks';
import Edit from './block';
import metaData from './block.json';

const PatternIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		style={{
			fillRule: "evenodd",
			clipRule: "evenodd",
			strokeLinejoin: "round",
			strokeMiterlimit: 2,
		}}
		viewBox="0 0 2134 2134"
	>
		<path
			d="M0 0h610.325v611.271H0z"
			style={{
				fill: "#bbe7fe",
				fillRule: "nonzero",
			}}
		/>
		<path
			d="M761.504 0h610.325v611.271H761.504z"
			style={{
				fill: "#e5e3b5",
				fillRule: "nonzero",
			}}
		/>
		<path
			d="M1828.17 0c-168.267 0-305.163 136.896-305.163 305.163v.95c0 168.266 136.896 305.158 305.163 305.158 168.267 0 305.162-136.892 305.162-305.159v-.95C2133.332 136.896 1996.437 0 1828.17 0Z"
			style={{
				fill: "#e5c2b5",
				fillRule: "nonzero",
			}}
		/>
		<path
			d="M305.163 761.033C136.896 761.033 0 897.929 0 1066.196v.95c0 168.267 136.896 305.158 305.163 305.158 168.266 0 305.162-136.891 305.162-305.158v-.95c0-168.267-136.896-305.163-305.163-305.163Z"
			style={{
				fill: "#ffd4db",
				fillRule: "nonzero",
			}}
		/>
		<path
			d="M761.504 761.033h610.325V1372.3H761.504z"
			style={{
				fill: "#d3b5e5",
				fillRule: "nonzero",
			}}
		/>
		<path
			d="M1523.01 761.033h610.325V1372.3H1523.01z"
			style={{
				fill: "#ffd4db",
				fillRule: "nonzero",
			}}
		/>
		<path
			d="M0 1522.07h610.325v611.267H0z"
			style={{
				fill: "#e5c2b5",
				fillRule: "nonzero",
			}}
		/>
		<path
			d="M1066.67 1522.07c-168.267 0-305.163 136.891-305.163 305.158v.95c0 168.267 136.896 305.158 305.163 305.158 168.266 0 305.162-136.891 305.162-305.158v-.95c0-168.267-136.896-305.158-305.162-305.158Z"
			style={{
				fill: "#e5e3b5",
				fillRule: "nonzero",
			}}
		/>
		<path
			d="M1523.01 1522.07h610.325v611.267H1523.01z"
			style={{
				fill: "#bbe7fe",
				fillRule: "nonzero",
			}}
		/>
	</svg>
);

registerBlockType(metaData, {
	edit: Edit,
	save() {
		return null;
	},
	icon: PatternIcon,
});
