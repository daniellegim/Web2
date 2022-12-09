import { Button, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
type CartItemProps = {
  id: number
  quantity: number
  data: Array<any>
}
export function CartItem({ id, quantity, data }: CartItemProps) {
const { removeFromCart } = useShoppingCart()
  const item = data.find((i: any) => i.id === id)
  if (item == null) return null

  return (
    <Stack direction='horizontal' gap={2} className='d-flex align-items-center'>
      <img
        src={item.imgUrl}
        style={{ width: '125px', height: '75px', objectFit: 'cover' }}
      />
      <div className='me-auto'>
        <div>
          {item.name}{' '}
          {quantity > 1 && (
            <span className='text-muted' style={{ fontSize: '.65rem' }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className='text-muted' style={{ fontSize: '.75rem' }}>
          {(item.price)}
        </div>
      </div>
      <div>


        <Button
          className='ms-sm-1'
          variant='outline-danger'
          size='sm'
          onClick={() => removeFromCart(item.id)}
        >
          &times;
        </Button>
          <div className='d-flex row-cols-auto p-1'>
              <div className='px-1'> שקל </div>
              <div>
                  { (item.price * quantity) }

              </div>


          </div>
      </div>
    </Stack>
  )
}
