import { ModeToggler } from "./mode-toggler";

export default function Header() {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 py-1 flex justify-between">
        <div>
          Logo
        </div>
        <div>
          Nav
        </div>
          <ModeToggler/>
      </div>
    </div>
  )
}