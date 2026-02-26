import { NavItem } from "../../types"

interface NavigationProps {
	navItems: NavItem[]
}

export const Navigation = ({ navItems }: NavigationProps) => {
	return (<nav className="hidden md:flex items-center gap-1">
		{navItems.map((item) => (
			<button
				type="button"
				key={item.label}
				className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${item.active
					? 'bg-accent-500/10 text-accent-600'
					: 'text-text-secondary hover:bg-surface-200/60 hover:text-text-primary'
					}`}
			>
				{item.icon}
				{item.label}
			</button>
		))}
	</nav>)
}