'use client';
import { useState, useEffect } from 'react';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import { bookingsApi } from '@/lib/api';
import { Booking } from '@/types';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const { data } = await bookingsApi.getAll({ page, limit: 10 });
      setBookings(data.bookings || []);
      setTotal(data.total || 0);
    } finally { setLoading(false); }
  };

  useEffect(() => { loadBookings(); }, [page]);

  const updateStatus = async (id: string, status: string) => {
    await bookingsApi.updateStatus(id, status);
    loadBookings();
    setModalOpen(false);
  };

  const columns = [
    { key: 'bookingId', label: 'Booking ID', render: (b: Booking) => <span className="font-mono text-xs font-bold text-[#5FAF00]">{b.bookingId}</span> },
    {
      key: 'customer', label: 'Customer',
      render: (b: Booking) => (
        <div>
          <div className="font-semibold text-sm">{b.customer.name}</div>
          <div className="text-xs text-gray-400">{b.customer.phone}</div>
        </div>
      ),
    },
    { key: 'product', label: 'Product', render: (b: Booking) => <span className="text-sm">{b.product?.name || '-'}</span> },
    {
      key: 'type', label: 'Type',
      render: (b: Booking) => (
        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${b.type === 'test_ride' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
          {b.type === 'test_ride' ? 'Test Ride' : 'Purchase'}
        </span>
      ),
    },
    {
      key: 'status', label: 'Status',
      render: (b: Booking) => (
        <span className={`text-xs font-semibold px-2 py-1 rounded-lg capitalize ${statusColors[b.status]}`}>{b.status}</span>
      ),
    },
    {
      key: 'createdAt', label: 'Date',
      render: (b: Booking) => <span className="text-xs text-gray-400">{new Date(b.createdAt).toLocaleDateString('en-IN')}</span>,
    },
  ];

  return (
    <>
      <AdminTable
        title="Bookings & Test Rides"
        data={bookings}
        columns={columns}
        loading={loading}
        total={total}
        page={page}
        onPageChange={setPage}
        onEdit={(b) => { setSelected(b); setModalOpen(true); }}
        searchPlaceholder="Search bookings..."
      />

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Booking Details" size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#f8fff0] rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Booking ID</p>
                <p className="font-bold text-[#5FAF00]">{selected.bookingId}</p>
              </div>
              <div className="bg-[#f8fff0] rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Type</p>
                <p className="font-bold capitalize">{selected.type.replace('_', ' ')}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <p className="font-semibold text-sm mb-2">Customer Details</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-gray-500">Name:</span> <span className="font-medium">{selected.customer.name}</span></div>
                <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{selected.customer.phone}</span></div>
                <div><span className="text-gray-500">Email:</span> <span className="font-medium">{selected.customer.email}</span></div>
                <div><span className="text-gray-500">City:</span> <span className="font-medium">{selected.customer.city || '-'}</span></div>
              </div>
            </div>

            {selected.preferredDate && (
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-semibold text-sm mb-2">Preferred Schedule</p>
                <p className="text-sm">{new Date(selected.preferredDate).toLocaleDateString('en-IN')} {selected.preferredTime && `at ${selected.preferredTime}`}</p>
              </div>
            )}

            <div>
              <p className="font-semibold text-sm mb-3">Update Status</p>
              <div className="grid grid-cols-2 gap-2">
                {['pending', 'confirmed', 'completed', 'cancelled'].map(status => (
                  <button key={status} onClick={() => updateStatus(selected._id, status)}
                    className={`py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${selected.status === status ? statusColors[status] + ' ring-2 ring-offset-1 ring-current' : 'border border-[#EAEAEA] hover:border-[#5FAF00]'}`}>
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </AdminModal>
    </>
  );
}
