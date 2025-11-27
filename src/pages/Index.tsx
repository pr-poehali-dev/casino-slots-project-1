import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import SlotMachine from '@/components/SlotMachine';

interface Slot {
  id: number;
  name: string;
  image: string;
  jackpot: number;
  category: string;
  hot: boolean;
}

interface Jackpot {
  title: string;
  amount: number;
  icon: string;
}

export default function Index() {
  const [jackpots, setJackpots] = useState<Jackpot[]>([
    { title: 'Mega Jackpot', amount: 15847362, icon: 'Crown' },
    { title: 'Super Jackpot', amount: 3245128, icon: 'Trophy' },
    { title: 'Mini Jackpot', amount: 524789, icon: 'Star' },
  ]);

  const [activeSlot, setActiveSlot] = useState<string | null>(null);

  const slots: Slot[] = [
    { id: 1, name: 'Royal Fortune', image: '👑', jackpot: 15847362, category: 'Mega', hot: true },
    { id: 2, name: 'Diamond Rush', image: '💎', jackpot: 3245128, category: 'Super', hot: true },
    { id: 3, name: 'Golden Empire', image: '🏛️', jackpot: 524789, category: 'Mini', hot: false },
    { id: 4, name: 'Lucky Seven', image: '🎰', jackpot: 15847362, category: 'Mega', hot: true },
    { id: 5, name: 'Treasure Vault', image: '💰', jackpot: 3245128, category: 'Super', hot: false },
    { id: 6, name: 'Pharaoh Gold', image: '📜', jackpot: 524789, category: 'Mini', hot: false },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setJackpots(prev =>
        prev.map(jackpot => ({
          ...jackpot,
          amount: jackpot.amount + Math.floor(Math.random() * 100) + 50,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center glow-gold">
                <Icon name="Sparkles" size={28} className="text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-primary text-glow">ROYAL SLOTS</h1>
            </div>
            <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold glow-gold hover:scale-105 transition-transform">
              <Icon name="Wallet" size={18} className="mr-2" />
              Пополнить
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {jackpots.map((jackpot, index) => (
              <Card
                key={index}
                className="relative overflow-hidden bg-gradient-to-br from-card via-card to-muted border-2 border-primary/30 glow-gold animate-pulse-glow"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" />
                <div className="relative p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Icon name={jackpot.icon as any} size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">{jackpot.title}</h3>
                  </div>
                  <div className="text-4xl font-bold text-primary text-glow animate-float">
                    {formatAmount(jackpot.amount)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Прогрессивный джекпот растёт!</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-4xl font-bold text-primary">Премиум слоты</h2>
              <Badge variant="outline" className="border-primary text-primary">
                <Icon name="TrendingUp" size={14} className="mr-1" />
                Горячие игры
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slots.map(slot => (
              <Card
                key={slot.id}
                className="group relative overflow-hidden bg-gradient-to-br from-card to-muted border-2 border-primary/20 hover:border-primary/60 transition-all duration-300 hover:glow-gold hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                
                {slot.hot && (
                  <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-destructive to-orange-600 text-white border-0 animate-pulse">
                    <Icon name="Flame" size={14} className="mr-1" />
                    HOT
                  </Badge>
                )}

                <div className="relative p-6">
                  <div className="text-8xl mb-4 text-center animate-float">{slot.image}</div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-center text-primary">{slot.name}</h3>
                    
                    <div className="bg-muted/50 rounded-lg p-3 border border-primary/20">
                      <p className="text-xs text-muted-foreground text-center mb-1">Джекпот</p>
                      <p className="text-2xl font-bold text-center text-primary text-glow">
                        {formatAmount(slot.jackpot)}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:scale-105 transition-transform glow-gold"
                        onClick={() => setActiveSlot(slot.name)}
                      >
                        <Icon name="Play" size={18} className="mr-2" />
                        Играть
                      </Button>
                      <Button variant="outline" size="icon" className="border-primary/30 hover:bg-primary/10">
                        <Icon name="Info" size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all glow-gold"
            >
              <Icon name="RefreshCw" size={20} className="mr-2" />
              Загрузить ещё слоты
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-primary/20 bg-card/50 backdrop-blur-sm py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Icon name="Shield" size={24} className="text-primary" />
              <p className="text-muted-foreground">Лицензированное казино • 18+</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Icon name="HeadphonesIcon" size={20} className="text-primary" />
                <span className="text-sm text-muted-foreground">Поддержка 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Lock" size={20} className="text-primary" />
                <span className="text-sm text-muted-foreground">Безопасные платежи</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeSlot && (
        <SlotMachine slotName={activeSlot} onClose={() => setActiveSlot(null)} />
      )}
    </div>
  );
}