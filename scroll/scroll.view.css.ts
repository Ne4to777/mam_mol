namespace $.$$ {

	const { per , rem , px } = $mol_style_unit

	$mol_style_define( $mol_scroll , {
		overflow: 'auto',
	} )
	
	$mol_style_define( $mol_scroll , {

		display: 'flex',
		overflow: 'overlay',
		flex: {
			direction: 'column',
			grow: 1,
			shrink: 1,
			// basis: 0,
		},
		outline: 'none',
		alignSelf: 'stretch',
		boxSizing: 'border-box',
		willChange: 'scroll-position',
		scroll: {
			padding: [ rem(.75), 0 ],
		},
		maxHeight: per(100),
		maxWidth: per(100),
		webkitOverflowScrolling: 'touch',
		contain: 'content',

		'>': {
			$mol_view: {
				transform: 'translateZ(0)', // enforce gpu scroll in all agents
			},
		},

		'::before': {
			display: 'none',
		},
		'::after': {
			display: 'none',
		},
		
		'::-webkit-scrollbar': {
			width: rem(.25),
			height: rem(.25),
		},
		
		':hover': {
			'::-webkit-scrollbar': {
				width: rem(.5),
				height: rem(.5),
			},
		},
		
		'@media' : {
			'print' : {
				overflow: 'visible',
				contain: 'none',
				maxHeight: 'unset',
			},
		},

	})

}
