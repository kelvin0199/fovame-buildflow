import { landedCost } from '../src/modules/procurement/procurement.service';
import { journalBalances } from '../src/modules/payments/payments.service';
import { deliveryOutcome } from '../src/modules/logistics/logistics.service';
import { calculateBalance } from '../src/modules/inventory/inventory.service';
import { settlementNet } from '../src/modules/settlements/settlements.service';

describe('BuildFlow deterministic domain rules',()=>{
  it('calculates landed cost without AI',()=>expect(landedCost({subtotalMinor:1000n,taxMinor:100n,deliveryMinor:50n,otherFeesMinor:25n})).toBe(1175n));
  it('requires a balanced journal',()=>expect(journalBalances([{debitMinor:1000n,creditMinor:0n},{debitMinor:0n,creditMinor:1000n}])).toBe(true));
  it('supports partial acceptance',()=>expect(deliveryOutcome([{expected:500,accepted:498,rejected:2}])).toBe('PARTIALLY_ACCEPTED'));
  it('derives inventory balance from movement semantics',()=>expect(calculateBalance([{type:'RECEIPT',quantity:498},{type:'ISSUE',quantity:25}])).toBe(473));
  it('computes deterministic settlement net',()=>expect(settlementNet(1000000n,20000n,30000n)).toBe(950000n));
});
