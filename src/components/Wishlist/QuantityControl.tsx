import { Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface QuantityControlProps {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
  className?: string
}

export function QuantityControl({ 
  quantity, 
  onIncrease, 
  onDecrease, 
  className = '' 
}: QuantityControlProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button 
        onClick={onDecrease} 
        variant="outline" 
        size="icon" 
        className="h-8 w-8 rounded-full"
        disabled={quantity <= 1}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-8 text-center">{quantity}</span>
      <Button 
        onClick={onIncrease} 
        variant="outline" 
        size="icon" 
        className="h-8 w-8 rounded-full"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}