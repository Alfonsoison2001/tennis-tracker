'use client'

// Tennis Ledger App v2.0 with Supabase
import React, { useState, useMemo, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const Icons = {
  Home: () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  DollarSign: () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  Settings: () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  FileText: () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Edit: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  TennisBall: () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M18.5 5.5c-3 3-3 7.5 0 12" strokeLinecap="round"/><path d="M5.5 5.5c3 3 3 7.5 0 12" strokeLinecap="round"/></svg>,
};

const CLASSES_PER_MONTH = 12;

interface Plan {
  id: string;
  month: string;
  classes: number;
  price: number;
  paidDate: string;
  paidAmount: number;
  method: string;
}

interface Class {
  id: string;
  date: string;
  note: string;
}

export default function TennisLedger() {
  const [tab, setTab] = useState('dashboard');
  const [plans, setPlans] = useState<Plan[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [showAddClass, setShowAddClass] = useState(false);
  const [showAddPlan, setShowAddPlan] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{ type: string | null; id: string | null }>({ type: null, id: null });
  const [loading, setLoading] = useState(true);

  // Load data from Supabase on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load classes
      const { data: clasesData } = await supabase
        .from('clases')
        .select('*')
        .order('fecha', { ascending: false });

      if (clasesData) {
        setClasses(clasesData.map(c => ({
          id: c.id,
          date: c.fecha,
          note: c.nota || ''
        })));
      }

      // Load payments
      const { data: pagosData } = await supabase
        .from('pagos')
        .select('*')
        .order('mes', { ascending: false });

      if (pagosData) {
        setPlans(pagosData.map(p => ({
          id: p.id,
          month: p.mes,
          classes: 12,
          price: Number(p.monto),
          paidDate: '',
          paidAmount: Number(p.monto),
          method: 'Transferencia'
        })));
      }

      // Load configuration
      const { data: configData } = await supabase
        .from('configuracion')
        .select('*');

      if (configData) {
        const startMonthConfig = configData.find(c => c.clave === 'startMonth');
        if (startMonthConfig) {
          setStartMonth(startMonthConfig.valor);
        }

        const monthlyClassesConfig = configData.find(c => c.clave === 'monthlyClasses');
        if (monthlyClassesConfig) {
          try {
            setMonthlyClasses(JSON.parse(monthlyClassesConfig.valor));
          } catch {
            // If parse fails, keep default
          }
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth);
  const [startMonth, setStartMonth] = useState('2025-12');
  const [monthlyClasses, setMonthlyClasses] = useState<Record<string, number>>({});
  const [showEditMonthClasses, setShowEditMonthClasses] = useState(false);
  const [editingMonthClasses, setEditingMonthClasses] = useState({ month: '', classes: CLASSES_PER_MONTH });
  const [newClass, setNewClass] = useState({ date: new Date().toISOString().split('T')[0], note: '' });

  const getClassesForMonth = (month: string) => {
    return monthlyClasses[month] !== undefined ? monthlyClasses[month] : CLASSES_PER_MONTH;
  };
  const [newPlan, setNewPlan] = useState({ month: selectedMonth, classes: CLASSES_PER_MONTH, price: 3600, paidDate: '', paidAmount: 3600, method: 'Transferencia' });

  const getMonthsBetween = (start: string, end: string) => {
    const [sy, sm] = start.split('-').map(Number);
    const [ey, em] = end.split('-').map(Number);
    return (ey - sy) * 12 + (em - sm) + 1;
  };

  const getAccumulatedData = (upToMonth: string) => {
    if (upToMonth < startMonth) return { totalAvailable: 0, totalTaken: 0, balance: 0, monthsCount: 0 };

    const monthsCount = getMonthsBetween(startMonth, upToMonth);

    let totalAvailable = 0;
    let currentMonth = startMonth;
    for (let i = 0; i < monthsCount; i++) {
      totalAvailable += getClassesForMonth(currentMonth);
      const [y, m] = currentMonth.split('-').map(Number);
      const nextDate = new Date(y, m, 1);
      currentMonth = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}`;
    }

    const totalTaken = classes.filter(c => c.date.substring(0, 7) <= upToMonth).length;
    const balance = totalAvailable - totalTaken;

    return { totalAvailable, totalTaken, balance, monthsCount };
  };

  const getMonthData = (month: string) => {
    const monthClasses = classes.filter(c => c.date.startsWith(month));
    const takenThisMonth = monthClasses.length;
    const classesThisMonth = getClassesForMonth(month);

    const accum = getAccumulatedData(month);

    const takenBefore = classes.filter(c => c.date.substring(0, 7) < month).length;

    const availableThisMonth = accum.totalAvailable - takenBefore;
    const remainingThisMonth = availableThisMonth - takenThisMonth;

    return {
      takenThisMonth,
      availableThisMonth,
      remainingThisMonth,
      classesThisMonth,
      monthClasses,
      plan: plans.find(p => p.month === month),
      monthsCount: accum.monthsCount
    };
  };

  const currentData = getMonthData(selectedMonth);
  const globalData = getAccumulatedData(selectedMonth);

  const allMonths = useMemo(() => {
    const months = new Set([startMonth, selectedMonth, ...classes.map(c => c.date.substring(0, 7))]);
    return Array.from(months).sort().reverse();
  }, [classes, selectedMonth, startMonth]);

  const formatMonth = (m: string) => {
    const [y, mo] = m.split('-');
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${months[parseInt(mo) - 1]} ${y}`;
  };

  const formatMonthShort = (m: string) => {
    const [y, mo] = m.split('-');
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${months[parseInt(mo) - 1]} ${y}`;
  };

  const navigateMonth = (direction: number) => {
    const [y, m] = selectedMonth.split('-').map(Number);
    const date = new Date(y, m - 1 + direction, 1);
    setSelectedMonth(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
  };

  const addClass = async () => {
    const { data, error } = await supabase
      .from('clases')
      .insert({ fecha: newClass.date, nota: newClass.note || null })
      .select()
      .single();

    if (!error && data) {
      setClasses([{ id: data.id, date: data.fecha, note: data.nota || '' }, ...classes]);
    }
    setNewClass({ date: new Date().toISOString().split('T')[0], note: '' });
    setShowAddClass(false);
  };

  const updateClass = async () => {
    if (!editingClass) return;

    const { error } = await supabase
      .from('clases')
      .update({ fecha: editingClass.date, nota: editingClass.note || null })
      .eq('id', editingClass.id);

    if (!error) {
      setClasses(classes.map(c => c.id === editingClass.id ? editingClass : c));
    }
    setEditingClass(null);
  };

  const deleteClass = async (id: string) => {
    const { error } = await supabase
      .from('clases')
      .delete()
      .eq('id', id);

    if (!error) {
      setClasses(classes.filter(c => c.id !== id));
    }
    setShowDeleteConfirm({ type: null, id: null });
  };

  const addPlan = async () => {
    const existingPlan = plans.find(p => p.month === newPlan.month);

    if (existingPlan) {
      // Update existing
      const { error } = await supabase
        .from('pagos')
        .update({ monto: newPlan.paidAmount })
        .eq('id', existingPlan.id);

      if (!error) {
        setPlans(plans.map(p => p.id === existingPlan.id ? { ...newPlan, id: p.id } : p));
      }
    } else {
      // Insert new
      const { data, error } = await supabase
        .from('pagos')
        .insert({ mes: newPlan.month, monto: newPlan.paidAmount })
        .select()
        .single();

      if (!error && data) {
        setPlans([{
          id: data.id,
          month: data.mes,
          classes: 12,
          price: Number(data.monto),
          paidDate: '',
          paidAmount: Number(data.monto),
          method: 'Transferencia'
        }, ...plans]);
      }
    }
    setNewPlan({ month: selectedMonth, classes: CLASSES_PER_MONTH, price: 3600, paidDate: '', paidAmount: 3600, method: 'Transferencia' });
    setShowAddPlan(false);
  };

  const updatePlan = async () => {
    if (!editingPlan) return;

    const { error } = await supabase
      .from('pagos')
      .update({ mes: editingPlan.month, monto: editingPlan.paidAmount })
      .eq('id', editingPlan.id);

    if (!error) {
      setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
    }
    setEditingPlan(null);
  };

  const deletePlan = async (id: string) => {
    const { error } = await supabase
      .from('pagos')
      .delete()
      .eq('id', id);

    if (!error) {
      setPlans(plans.filter(p => p.id !== id));
    }
    setShowDeleteConfirm({ type: null, id: null });
  };

  const quickAddClass = async () => {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('clases')
      .insert({ fecha: today, nota: null })
      .select()
      .single();

    if (!error && data) {
      setClasses([{ id: data.id, date: data.fecha, note: '' }, ...classes]);
    }
  };

  const saveConfig = async (key: string, value: string) => {
    await supabase
      .from('configuracion')
      .upsert({ clave: key, valor: value }, { onConflict: 'clave' });
  };

  const handleStartMonthChange = (value: string) => {
    setStartMonth(value);
    saveConfig('startMonth', value);
  };

  const handleMonthlyClassesChange = (month: string, count: number) => {
    const newMonthlyClasses = { ...monthlyClasses, [month]: count };
    setMonthlyClasses(newMonthlyClasses);
    saveConfig('monthlyClasses', JSON.stringify(newMonthlyClasses));
  };

  const NavButton = ({ id, icon: Icon, label }: { id: string; icon: () => React.ReactElement; label: string }) => (
    <button onClick={() => setTab(id)} className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${tab === id ? 'bg-[#c8e64a] text-gray-800 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>
      <Icon /><span className="text-xs font-medium">{label}</span>
    </button>
  );

  const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-2xl p-5 ${className}`}>{children}</div>
  );

  const Modal = ({ show, onClose, title, children }: { show: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1"><Icons.X /></button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  const ProgressRing = ({ taken, total, size = 200 }: { taken: number; total: number; size?: number }) => {
    const strokeWidth = 16;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const progress = total > 0 ? Math.min((taken / total) * 100, 100) : 0;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle cx={size/2} cy={size/2} r={radius} stroke="#f0f0f0" strokeWidth={strokeWidth} fill="none" />
          <circle cx={size/2} cy={size/2} r={radius} stroke="#c8e64a" strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-700 ease-out" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-gray-800">{taken}</span>
          <span className="text-gray-400 text-sm mt-1">de {total} disponibles</span>
        </div>
      </div>
    );
  };

  const ActionButtons = ({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) => (
    <div className="flex gap-1">
      <button onClick={onEdit} className="p-2 text-gray-400 hover:text-[#9bc72b] hover:bg-gray-50 rounded-xl transition-colors"><Icons.Edit /></button>
      <button onClick={onDelete} className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-50 rounded-xl transition-colors"><Icons.Trash /></button>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e8e8e8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#c8e64a] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Icons.TennisBall />
          </div>
          <p className="text-gray-500">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8e8e8] text-gray-800">
      <div className="max-w-lg mx-auto pb-28">
        {/* Header */}
        <header className="bg-white p-5 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#c8e64a] rounded-full flex items-center justify-center text-gray-700">
              <Icons.TennisBall />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Tennis Ledger</h1>
              <p className="text-gray-400 text-xs">Tu estado de cuenta</p>
            </div>
          </div>
        </header>

        <main className="p-4">
          {tab === 'dashboard' && (
            <div className="space-y-4">
              {/* Navegación de mes */}
              <div className="flex items-center justify-between bg-white rounded-2xl p-3">
                <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400"><Icons.ChevronLeft /></button>
                <div className="text-center">
                  <h2 className="text-lg font-bold text-gray-800">{formatMonth(selectedMonth)}</h2>
                  <button
                    onClick={() => { setEditingMonthClasses({ month: selectedMonth, classes: getClassesForMonth(selectedMonth) }); setShowEditMonthClasses(true); }}
                    className="text-xs text-gray-400 hover:text-[#9bc72b] transition-colors"
                  >
                    {currentData.classesThisMonth} clases este mes
                  </button>
                </div>
                <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400"><Icons.ChevronRight /></button>
              </div>

              {/* Anillo de progreso principal */}
              <Card className="flex flex-col items-center py-8">
                <ProgressRing taken={currentData.takenThisMonth} total={currentData.availableThisMonth} />
                <p className="text-gray-400 mt-4 text-sm">Clases tomadas este mes</p>

                {/* Desglose */}
                <div className="w-full mt-6 space-y-3 px-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-gray-500 text-sm">Acumulado ({currentData.monthsCount} mes{currentData.monthsCount > 1 ? 'es' : ''})</span>
                    <span className="font-semibold text-gray-700">{currentData.availableThisMonth + currentData.takenThisMonth}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-[#9bc72b] text-sm">Tomadas este mes</span>
                    <span className="font-semibold text-[#9bc72b]">-{currentData.takenThisMonth}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-700 font-medium">Disponibles</span>
                    <span className={`font-bold text-2xl ${currentData.remainingThisMonth > 0 ? 'text-[#c8e64a]' : 'text-gray-300'}`}>
                      {currentData.remainingThisMonth}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Stats cards */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="text-center">
                  <p className="text-4xl font-bold text-[#9bc72b]">{currentData.takenThisMonth}</p>
                  <p className="text-xs text-gray-400 mt-2">Tomadas</p>
                </Card>
                <Card className="text-center">
                  <p className={`text-4xl font-bold ${currentData.remainingThisMonth > 0 ? 'text-[#c8e64a]' : 'text-gray-300'}`}>{currentData.remainingThisMonth}</p>
                  <p className="text-xs text-gray-400 mt-2">Por tomar</p>
                </Card>
              </div>

              {/* Acumulado Total */}
              <Card className="bg-gradient-to-br from-[#c8e64a]/10 to-white border-[#c8e64a]/20">
                <h3 className="text-xs text-gray-500 mb-4 uppercase tracking-wide">Acumulado Total</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-700">{globalData.totalAvailable}</p>
                    <p className="text-xs text-gray-400 mt-1">Generadas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#9bc72b]">{globalData.totalTaken}</p>
                    <p className="text-xs text-gray-400 mt-1">Tomadas</p>
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${globalData.balance > 0 ? 'text-[#c8e64a]' : 'text-gray-300'}`}>{globalData.balance}</p>
                    <p className="text-xs text-gray-400 mt-1">Saldo</p>
                  </div>
                </div>
              </Card>

              {/* Pago del mes */}
              <Card className="text-center">
                <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">{formatMonthShort(selectedMonth)}</p>
                <p className="text-4xl font-bold text-gray-800">${(currentData.plan?.paidAmount || 0).toLocaleString()}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center text-sm mb-3">
                    <span className="text-gray-400">Meta</span>
                    <span className="text-gray-600">${(currentData.classesThisMonth * 350).toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#c8e64a] to-[#9bc72b] transition-all duration-500 rounded-full"
                      style={{ width: `${Math.min(((currentData.plan?.paidAmount || 0) / (currentData.classesThisMonth * 350)) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{currentData.classesThisMonth} clases x $350</p>
                </div>
              </Card>

              {/* Botones de acción */}
              <button onClick={quickAddClass} className="w-full bg-gradient-to-r from-[#c8e64a] to-[#b5d43a] hover:from-[#b5d43a] hover:to-[#9bc72b] text-gray-800 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all shadow-lg shadow-[#c8e64a]/30 text-lg">
                <Icons.Check /> Registrar clase
              </button>

              <button onClick={() => setShowAddClass(true)} className="w-full bg-white hover:bg-[#ebebeb] text-gray-600 py-3 rounded-2xl font-medium flex items-center justify-center gap-2 transition-colors">
                <Icons.Plus /> Fecha específica
              </button>
            </div>
          )}

          {tab === 'statements' && (
            <div className="space-y-4">
              <h2 className="font-bold text-lg text-gray-800 px-1">Estado de cuenta</h2>

              {/* Resumen global */}
              <Card className="bg-gradient-to-br from-[#c8e64a]/10 to-white border-[#c8e64a]/20">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-700">{globalData.totalAvailable}</p>
                    <p className="text-xs text-gray-400">Generadas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#9bc72b]">{globalData.totalTaken}</p>
                    <p className="text-xs text-gray-400">Tomadas</p>
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${globalData.balance > 0 ? 'text-[#c8e64a]' : 'text-gray-300'}`}>{globalData.balance}</p>
                    <p className="text-xs text-gray-400">Por tomar</p>
                  </div>
                </div>
              </Card>

              {/* Lista de meses */}
              {allMonths.filter(m => m >= startMonth).map(month => {
                const data = getMonthData(month);
                const progress = data.availableThisMonth > 0 ? (data.takenThisMonth / data.availableThisMonth) * 100 : 0;
                return (
                  <Card key={month} className="relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#c8e64a] to-[#9bc72b] transition-all" style={{ width: `${Math.min(progress, 100)}%` }} />
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800">{formatMonthShort(month)}</h3>
                        <p className="text-xs text-gray-400">{data.classesThisMonth} clases del plan</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#9bc72b]">{data.takenThisMonth}<span className="text-gray-300 text-lg">/{data.availableThisMonth}</span></p>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span className="text-[#9bc72b]">{data.takenThisMonth} tomadas</span>
                      {data.remainingThisMonth > 0 && <span className="text-gray-400">{data.remainingThisMonth} pendientes</span>}
                      {data.remainingThisMonth === 0 && <span className="text-[#9bc72b]">Completo</span>}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {tab === 'classes' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h2 className="font-bold text-lg text-gray-800">Registro de clases</h2>
                <button onClick={() => setShowAddClass(true)} className="bg-[#c8e64a] hover:bg-[#b5d43a] px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 text-gray-700 transition-colors">
                  <Icons.Plus /> Nueva
                </button>
              </div>
              {classes.length === 0 ? (
                <Card className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icons.Calendar />
                  </div>
                  <p className="text-gray-500">No hay clases registradas</p>
                  <p className="text-sm text-gray-400 mt-1">Usa el boton del inicio para agregar</p>
                </Card>
              ) : (
                classes.sort((a, b) => b.date.localeCompare(a.date)).map(c => (
                  <Card key={c.id} className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full flex-shrink-0 bg-[#c8e64a]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">{new Date(c.date + 'T12:00:00').toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      {c.note && <p className="text-xs text-gray-400 truncate">{c.note}</p>}
                    </div>
                    <ActionButtons onEdit={() => setEditingClass({ ...c })} onDelete={() => setShowDeleteConfirm({ type: 'class', id: c.id })} />
                  </Card>
                ))
              )}
            </div>
          )}

          {tab === 'payments' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h2 className="font-bold text-lg text-gray-800">Pagos mensuales</h2>
                <button onClick={() => { setNewPlan({ ...newPlan, month: selectedMonth, paidAmount: 0 }); setShowAddPlan(true); }} className="bg-[#c8e64a] hover:bg-[#b5d43a] px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 text-gray-700 transition-colors">
                  <Icons.Plus /> Nuevo
                </button>
              </div>
              {plans.length === 0 ? (
                <Card className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icons.DollarSign />
                  </div>
                  <p className="text-gray-500">No hay pagos registrados</p>
                  <p className="text-sm text-gray-400 mt-1">Registra tus pagos mensuales</p>
                </Card>
              ) : (
                plans.sort((a, b) => b.month.localeCompare(a.month)).map(p => {
                  const monthClasses = getClassesForMonth(p.month);
                  const meta = monthClasses * 350;
                  const progress = Math.min((p.paidAmount / meta) * 100, 100);
                  return (
                    <Card key={p.id}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-800">{formatMonthShort(p.month)}</h3>
                          <span className={`text-xs ${p.paidAmount >= meta ? 'text-[#9bc72b]' : 'text-gray-400'}`}>
                            {p.paidAmount >= meta ? 'Completo' : `${Math.round(progress)}%`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-gray-800">${p.paidAmount.toLocaleString()}</span>
                          <ActionButtons onEdit={() => setEditingPlan({ ...p })} onDelete={() => setShowDeleteConfirm({ type: 'plan', id: p.id })} />
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#c8e64a] to-[#9bc72b] transition-all" style={{ width: `${progress}%` }} />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Meta: ${meta.toLocaleString()}</p>
                    </Card>
                  );
                })
              )}
            </div>
          )}

          {tab === 'settings' && (
            <div className="space-y-4">
              <h2 className="font-bold text-lg text-gray-800 px-1">Configuracion</h2>

              <Card>
                <h3 className="font-semibold text-gray-800 mb-3">Mes de inicio</h3>
                <input
                  type="month"
                  value={startMonth}
                  onChange={e => handleStartMonthChange(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#c8e64a] focus:border-transparent"
                />
                <p className="text-xs text-gray-400 mt-2">Las clases se cuentan desde este mes</p>
              </Card>

              <Card>
                <h3 className="font-semibold text-gray-800 mb-3">Clases por mes</h3>
                <p className="text-xs text-gray-400 mb-3">Default: {CLASSES_PER_MONTH} clases</p>
                {Object.keys(monthlyClasses).length > 0 ? (
                  <div className="space-y-2">
                    {Object.entries(monthlyClasses).sort((a, b) => b[0].localeCompare(a[0])).map(([month, count]) => (
                      <div key={month} className="flex justify-between items-center text-sm py-2 border-b border-gray-50">
                        <span className="text-gray-500">{formatMonthShort(month)}</span>
                        <span className={count !== CLASSES_PER_MONTH ? 'text-[#9bc72b] font-medium' : 'text-gray-600'}>{count} clases</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">Todos los meses usan {CLASSES_PER_MONTH} clases</p>
                )}
              </Card>

              <Card>
                <h3 className="font-semibold text-gray-800 mb-3">Resumen</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-500">Clases por mes</span><span className="text-gray-800">{CLASSES_PER_MONTH}</span></div>
                  <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-500">Meses activos</span><span className="text-gray-800">{globalData.monthsCount || 0}</span></div>
                  <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-500">Total generadas</span><span className="text-gray-800">{globalData.totalAvailable}</span></div>
                  <div className="flex justify-between py-2 border-b border-gray-50"><span className="text-gray-500">Total tomadas</span><span className="text-[#9bc72b]">{globalData.totalTaken}</span></div>
                  <div className="flex justify-between py-2"><span className="text-gray-500">Saldo disponible</span><span className={`font-semibold ${globalData.balance > 0 ? 'text-[#c8e64a]' : 'text-gray-300'}`}>{globalData.balance}</span></div>
                </div>
              </Card>

              <Card>
                <h3 className="font-semibold text-gray-800 mb-3">Como funciona</h3>
                <div className="space-y-3 text-sm text-gray-500">
                  <p>Cada mes <span className="text-gray-800 font-medium">sumas clases</span> a tu saldo</p>
                  <p>Puedes <span className="text-[#9bc72b] font-medium">ajustar clases por mes</span></p>
                  <p>Las clases tomadas se <span className="text-gray-800 font-medium">restan del total</span></p>
                  <p>El saldo <span className="text-[#c8e64a] font-medium">nunca expira</span></p>
                </div>
              </Card>
            </div>
          )}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white backdrop-blur-lg">
          <div className="max-w-lg mx-auto flex justify-around py-3 px-2">
            <NavButton id="dashboard" icon={Icons.Home} label="Inicio" />
            <NavButton id="statements" icon={Icons.FileText} label="Estado" />
            <NavButton id="classes" icon={Icons.Calendar} label="Clases" />
            <NavButton id="payments" icon={Icons.DollarSign} label="Pagos" />
            <NavButton id="settings" icon={Icons.Settings} label="Config" />
          </div>
        </nav>
      </div>

      {/* Modal: Nueva Clase */}
      <Modal show={showAddClass} onClose={() => setShowAddClass(false)} title="Registrar clase">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-2">Fecha de la clase</label>
            <input type="date" value={newClass.date} onChange={e => setNewClass({ ...newClass, date: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#c8e64a]" />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-2">Nota (opcional)</label>
            <input type="text" value={newClass.note} onChange={e => setNewClass({ ...newClass, note: e.target.value })} placeholder="Ej: Clase con coach nuevo" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c8e64a]" />
          </div>
          <button onClick={addClass} className="w-full bg-gradient-to-r from-[#c8e64a] to-[#b5d43a] py-4 rounded-xl font-semibold text-gray-800 transition-colors shadow-lg shadow-[#c8e64a]/30">Guardar clase</button>
        </div>
      </Modal>

      {/* Modal: Editar Clase */}
      <Modal show={!!editingClass} onClose={() => setEditingClass(null)} title="Editar clase">
        {editingClass && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-2">Fecha</label>
              <input type="date" value={editingClass.date} onChange={e => setEditingClass({ ...editingClass, date: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#c8e64a]" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">Nota (opcional)</label>
              <input type="text" value={editingClass.note} onChange={e => setEditingClass({ ...editingClass, note: e.target.value })} placeholder="Ej: Clase con coach nuevo" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c8e64a]" />
            </div>
            <button onClick={updateClass} className="w-full bg-gray-800 hover:bg-gray-700 py-4 rounded-xl font-semibold text-white transition-colors">Actualizar</button>
          </div>
        )}
      </Modal>

      {/* Modal: Nuevo Plan */}
      <Modal show={showAddPlan} onClose={() => setShowAddPlan(false)} title="Registrar pago">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-2">Mes</label>
            <input type="month" value={newPlan.month} onChange={e => setNewPlan({ ...newPlan, month: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#c8e64a]" />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-2">Monto</label>
            <input type="number" value={newPlan.paidAmount} onChange={e => setNewPlan({ ...newPlan, paidAmount: parseInt(e.target.value) || 0, price: parseInt(e.target.value) || 0 })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-800 text-2xl text-center font-bold focus:outline-none focus:ring-2 focus:ring-[#c8e64a]" placeholder="0" />
          </div>
          <button onClick={addPlan} className="w-full bg-gradient-to-r from-[#c8e64a] to-[#b5d43a] py-4 rounded-xl font-semibold text-gray-800 transition-colors shadow-lg shadow-[#c8e64a]/30">Guardar</button>
        </div>
      </Modal>

      {/* Modal: Editar Plan */}
      <Modal show={!!editingPlan} onClose={() => setEditingPlan(null)} title="Editar pago">
        {editingPlan && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-2">Mes</label>
              <input type="month" value={editingPlan.month} onChange={e => setEditingPlan({ ...editingPlan, month: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#c8e64a]" />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">Monto</label>
              <input type="number" value={editingPlan.paidAmount} onChange={e => setEditingPlan({ ...editingPlan, paidAmount: parseInt(e.target.value) || 0, price: parseInt(e.target.value) || 0 })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-800 text-2xl text-center font-bold focus:outline-none focus:ring-2 focus:ring-[#c8e64a]" />
            </div>
            <button onClick={updatePlan} className="w-full bg-gray-800 hover:bg-gray-700 py-4 rounded-xl font-semibold text-white transition-colors">Actualizar</button>
          </div>
        )}
      </Modal>

      {/* Modal: Confirmar eliminación */}
      <Modal show={showDeleteConfirm.type !== null} onClose={() => setShowDeleteConfirm({ type: null, id: null })} title="Confirmar">
        <div className="space-y-4">
          <p className="text-gray-600">Eliminar {showDeleteConfirm.type === 'class' ? 'esta clase' : 'este pago'}?</p>
          <div className="flex gap-3">
            <button onClick={() => setShowDeleteConfirm({ type: null, id: null })} className="flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-medium text-gray-600 transition-colors">Cancelar</button>
            <button onClick={() => showDeleteConfirm.type === 'class' ? deleteClass(showDeleteConfirm.id!) : deletePlan(showDeleteConfirm.id!)} className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-medium text-white transition-colors">Eliminar</button>
          </div>
        </div>
      </Modal>

      {/* Modal: Editar clases del mes */}
      <Modal show={showEditMonthClasses} onClose={() => setShowEditMonthClasses(false)} title={`Clases de ${formatMonthShort(editingMonthClasses.month)}`}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-2">Clases disponibles</label>
            <input
              type="number"
              value={editingMonthClasses.classes}
              onChange={e => setEditingMonthClasses({ ...editingMonthClasses, classes: parseInt(e.target.value) || 0 })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-800 text-2xl text-center font-bold focus:outline-none focus:ring-2 focus:ring-[#c8e64a]"
              min="0"
              max="99"
            />
          </div>
          <p className="text-xs text-gray-400">Por defecto son {CLASSES_PER_MONTH} clases</p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                handleMonthlyClassesChange(editingMonthClasses.month, CLASSES_PER_MONTH);
                setShowEditMonthClasses(false);
              }}
              className="flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-medium text-gray-600 transition-colors"
            >
              Default ({CLASSES_PER_MONTH})
            </button>
            <button
              onClick={() => {
                handleMonthlyClassesChange(editingMonthClasses.month, editingMonthClasses.classes);
                setShowEditMonthClasses(false);
              }}
              className="flex-1 bg-gradient-to-r from-[#c8e64a] to-[#b5d43a] py-3 rounded-xl font-medium text-gray-800 transition-colors"
            >
              Guardar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
