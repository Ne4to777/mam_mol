namespace $ {

	/** Stack with wrapping layout. */
	export class $mol_layout_wrap extends $mol_layout_flex {
		
		ortho = $mol_layout_flex.make({})

		down() {
			
			const limit = this.limit()
			const items = this.items

			this.ortho.items = []

			let index = 0
			all: while( index < items.length ) {

				const group = $mol_layout_flex.make({
					pos: this.pos,
					size: this.size,
					ortho: $mol_layout_stack.make({})
				})

				group: while( index < items.length ) {

					const line = [] as typeof items
					let frag: $mol_layout
					let ind = index
					let line_min = 0
					let line_max = 0

					let break_after! : $mol_layout_break
					let break_before! : $mol_layout_break

					line: while( true ) {
						
						frag = items[ ind ]
						line.push( frag )
						line_min = Math.max( line_min, frag.min )
						line_max += frag.max

						++ ind
						const next = items[ ind ]
						if( !next ) break

						break_after = frag.break_after()
						break_before = next.break_before()
						
						if( break_after === $mol_layout_break.force ) break line
						if( break_before === $mol_layout_break.force ) break line

						if( break_after === $mol_layout_break.taboo ) continue line
						if( break_before === $mol_layout_break.taboo ) continue line

						break line
						
					}

					group.max += line_max
					
					if( group.items.length > 0 ) {
						if( group.max > limit ) break group
					}

					group.min = Math.max( group.min , line_min )

					group.items.push( ... line )
					group.ortho!.items.push( ... line.map( frag => frag.ortho! ) )
					index += line.length

					if( break_after === $mol_layout_break.force ) break group
					if( break_before === $mol_layout_break.force ) break group

				}

				group.down()
				
				this.ortho.items.push( group.ortho! )

			}

		}

	}

}
