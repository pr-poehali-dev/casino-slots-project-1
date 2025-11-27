import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface SlotMachineProps {
  slotName: string;
  onClose: () => void;
}

const symbols = ['👑', '💎', '🎰', '💰', '⭐', '🍀', '🔔', '7️⃣'];

export default function SlotMachine({ slotName, onClose }: SlotMachineProps) {
  const [balance, setBalance] = useState(10000);
  const [bet, setBet] = useState(100);
  const [reels, setReels] = useState([symbols[0], symbols[1], symbols[2]]);
  const [spinning, setSpinning] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const [totalWins, setTotalWins] = useState(0);

  const spin = () => {
    if (spinning || balance < bet) return;

    setSpinning(true);
    setBalance(balance - bet);
    setWinAmount(0);

    let spinCount = 0;
    const spinInterval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ]);
      spinCount++;

      if (spinCount >= 20) {
        clearInterval(spinInterval);
        const finalReels = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
        ];
        setReels(finalReels);
        calculateWin(finalReels);
        setSpinning(false);
      }
    }, 100);
  };

  const calculateWin = (finalReels: string[]) => {
    let win = 0;

    if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
      const symbol = finalReels[0];
      if (symbol === '7️⃣') win = bet * 100;
      else if (symbol === '👑') win = bet * 50;
      else if (symbol === '💎') win = bet * 30;
      else if (symbol === '💰') win = bet * 20;
      else if (symbol === '🎰') win = bet * 15;
      else if (symbol === '⭐') win = bet * 10;
      else if (symbol === '🍀') win = bet * 8;
      else if (symbol === '🔔') win = bet * 5;
    } else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2]) {
      win = bet * 2;
    }

    if (win > 0) {
      setWinAmount(win);
      setBalance(prev => prev + win);
      setTotalWins(prev => prev + win);
    }
  };

  const changeBet = (amount: number) => {
    const newBet = bet + amount;
    if (newBet >= 10 && newBet <= 1000) {
      setBet(newBet);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gradient-to-br from-card via-muted to-card border-2 border-primary/30 glow-gold">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-primary">{slotName}</h2>
              <p className="text-sm text-muted-foreground mt-1">Удачи в игре!</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-destructive/20 hover:text-destructive"
            >
              <Icon name="X" size={24} />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-muted/50 rounded-lg p-3 border border-primary/20">
              <p className="text-xs text-muted-foreground text-center mb-1">Баланс</p>
              <p className="text-lg font-bold text-center text-primary">{formatAmount(balance)}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 border border-primary/20">
              <p className="text-xs text-muted-foreground text-center mb-1">Ставка</p>
              <p className="text-lg font-bold text-center text-primary">{formatAmount(bet)}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 border border-primary/20">
              <p className="text-xs text-muted-foreground text-center mb-1">Всего выиграно</p>
              <p className="text-lg font-bold text-center text-accent">{formatAmount(totalWins)}</p>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-background to-muted rounded-2xl p-8 border-4 border-primary/30 glow-gold">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {reels.map((symbol, index) => (
                <div
                  key={index}
                  className={`bg-card rounded-xl border-4 border-primary/40 flex items-center justify-center aspect-square ${
                    spinning ? 'animate-pulse-glow' : ''
                  }`}
                >
                  <span className={`text-7xl ${spinning ? 'animate-spin' : 'animate-float'}`}>
                    {symbol}
                  </span>
                </div>
              ))}
            </div>

            {winAmount > 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Badge className="text-2xl font-bold bg-gradient-to-r from-accent to-primary text-primary-foreground py-3 px-6 animate-pulse-glow">
                  <Icon name="Trophy" size={24} className="mr-2" />
                  Выигрыш: {formatAmount(winAmount)}!
                </Badge>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => changeBet(-10)}
                disabled={spinning || bet <= 10}
                className="border-primary/30"
              >
                <Icon name="Minus" size={18} />
              </Button>
              <div className="flex-1 text-center">
                <p className="text-sm text-muted-foreground">Изменить ставку</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => changeBet(10)}
                disabled={spinning || bet >= 1000}
                className="border-primary/30"
              >
                <Icon name="Plus" size={18} />
              </Button>
            </div>

            <Button
              size="lg"
              onClick={spin}
              disabled={spinning || balance < bet}
              className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-xl py-6 glow-gold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {spinning ? (
                <>
                  <Icon name="Loader2" size={24} className="mr-2 animate-spin" />
                  Вращение...
                </>
              ) : balance < bet ? (
                'Недостаточно средств'
              ) : (
                <>
                  <Icon name="Play" size={24} className="mr-2" />
                  КРУТИТЬ ({formatAmount(bet)})
                </>
              )}
            </Button>
          </div>

          <div className="bg-muted/30 rounded-lg p-4 border border-primary/20">
            <h3 className="text-sm font-semibold text-primary mb-2">Таблица выплат:</h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>7️⃣ 7️⃣ 7️⃣ → x100</div>
              <div>👑 👑 👑 → x50</div>
              <div>💎 💎 💎 → x30</div>
              <div>💰 💰 💰 → x20</div>
              <div>🎰 🎰 🎰 → x15</div>
              <div>⭐ ⭐ ⭐ → x10</div>
              <div>🍀 🍀 🍀 → x8</div>
              <div>🔔 🔔 🔔 → x5</div>
              <div className="col-span-2 text-center mt-2 text-accent">Два одинаковых → x2</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
