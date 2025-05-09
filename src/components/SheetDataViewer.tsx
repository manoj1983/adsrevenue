
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface SheetDataViewerProps {
  range?: string;
}

const SheetDataViewer: React.FC<SheetDataViewerProps> = ({ range = "Sheet1!A:E" }) => {
  const [data, setData] = useState<string[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSheetData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: sheetData, error } = await supabase.functions.invoke('get-sheet-data', {
        body: { range },
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to fetch sheet data');
      }
      
      if (sheetData.success && sheetData.data) {
        setData(sheetData.data);
        toast.success('Sheet data loaded successfully');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err: any) {
      console.error('Error fetching sheet data:', err);
      setError(err.message || 'Failed to fetch data');
      toast.error(`Error: ${err.message || 'Failed to fetch data'}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSheetData();
  }, [range]);

  if (error) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-red-500">Error Loading Sheet Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
          <Button onClick={fetchSheetData} className="mt-4">Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="bg-muted">
        <CardTitle>Google Sheet Data</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-8 w-full" />
            ))}
          </div>
        ) : data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {data[0].map((header, index) => (
                    <th 
                      key={index}
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td 
                        key={cellIndex} 
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center py-4">No data available</p>
        )}
        
        <Button 
          onClick={fetchSheetData} 
          className="mt-4"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Refresh Data'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SheetDataViewer;
