import React from 'react';

const Title = ({ children, i }) => {
	return (
		<React.Fragment>
			<p>
				<strong>{children}</strong>
			</p>
			<style jsx>{`
				p {
					font-family: inherit;
					display: block;
					font-size: 1.25em;
				}
			`}</style>
		</React.Fragment>
	);
};

export default Title;