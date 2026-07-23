'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import api from '@/lib/api';
import { formatPrice } from '@/lib/utils';

interface Order {
  _id: string;
  orderId: string;
  customer: { name: string; email: string; phone: string };
  product: { name: string };
  amount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Order | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const { register, handleSubmit, reset } = useForm();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/orders', { params: { page, limit: 10 } });
      setOrders(data.data || data.orders || []);
      setTotal(data.total || 0);
    } catch { setOrders([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchOrders(); }, [page]);

  const openEdit = (o: Order) => {
    setEditing(o);
    reset({ status: o.status, paymentStatus: o.paymentStatus });
    setModalOpen(true);
  };

  const onSubmit = async (data: Record<string, unknown>) => {
    if (!editing) return;
    try {
      await api.put(`/orders/${editing._id}`, data);
      setModalOpen(false);
      fetchOrders();
    } catch { alert('Failed to update order'); }
  };

  const columns = [
    { key: 'orderId', label: 'Order ID', render: (o: Order) => <span className="font-mono text-xs font-bold text-[#5FAF00]">{o.orderId}</span> },
    { key: 'customer', label: 'Customer', render: (o: Order) => (
      <div><div className="font-semibold">{o.customer?.name}</div><div className="text-xs text-gray-400">{o.customer?.phone}</div></div>
    )},
    { key: 'product', label: 'Product', render: (o: Order) => <span className="text-sm">{o.product?.name}</span> },
    { key: 'amount', label: 'Amount', render: (o: Order) => <span className="font-bold text-[#5FAF00]">{formatPrice(o.amount)}</span> },
    { key: 'status', label: 'Status', render: (o: Order) => (
      <span className={`text-xs font-semibold px-2 py-1 rounded-lg capitalize ${statusColors[o.status] || 'bg-gray-100 text-gray-600'}`}>{o.status}</span>
    )},
    { key: 'paymentStatus', label: 'Payment', render: (o: Order) => (
      <span className={`text-xs font-semibold px-2 py-1 rounded-lg capitalize ${o.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{o.paymentStatus}</span>
    )},
    { key: 'createdAt', label: 'Date', render: (o: Order) => <span className="text-xs text-gray-400">{new Date(o.createdAt).toLocaleDateString('en-IN')}</span> },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#111]">Orders</h1>
        <p className="text-gray-500 text-sm">Manage all customer orders</p>
      </div>
      <AdminTable title="Orders" data={orders} columns={columns} loading={loading}
        onEdit={openEdit} total={total} page={page} onPageChange={setPage} />

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Update Order Status">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-1 block">Order Status</label>
            <select {...register('status')} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] bg-white">
              {['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
                <option key={s} value={s} className="capitalize">{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Payment Status</label>
            <select {...register('paymentStatus')} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] bg-white">
              {['pending', 'paid', 'failed', 'refunded'].map(s => (
                <option key={s} value={s} className="capitalize">{s}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1 justify-center py-3">Update Order</button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center py-3">Cancel</button>
          </div>
        </form>
      </AdminModal>
    </>
  );
}
