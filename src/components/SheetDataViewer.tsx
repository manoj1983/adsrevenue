
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from '@/hooks/use-toast';

interface SheetDataViewerProps {
  range?: string;
  title?: string;
}

const SheetDataViewer: React.FC<SheetDataViewerProps> = ({ 
  range = "Sheet1!A:E",
  title = "Contact Form Submissions" 
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { toast } = useToast();

  const fetchSheetData = async () => {
    const response = await fetch(`https://kxvdamaycgeioudmjrli.supabase.co/functions/v1/get-sheet-data?range=${encodeURIComponent(range)}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch data: ${errorText}`);
    }
    const data = await response.json();
    return data.data || [];
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['sheetData', range],
    queryFn: fetchSheetData,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const filteredData = React.useMemo(() => {
    if (!data) return [];
    return data.filter((row: string[]) => 
      row.some((cell) => 
        cell && cell.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const downloadCSV = () => {
    if (!data || data.length === 0) return;
    
    // Create CSV content
    const headers = data[0].join(',');
    const rows = data.slice(1).map((row: string[]) => row.join(','));
    const csvContent = `${headers}\n${rows.join('\n')}`;
    
    // Create a download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Set link attributes
    link.setAttribute('href', url);
    link.setAttribute('download', `${title.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.csv`);
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Show error message if fetch fails
  React.useEffect(() => {
    if (isError && error) {
      toast({
        title: "Error loading data",
        description: error.toString(),
        variant: "destructive"
      });
    }
  }, [isError, error, toast]);

  // Handle manual refresh
  const handleRefresh = () => {
    toast({
      title: "Refreshing data",
      description: "Fetching the latest data..."
    });
    refetch();
  };

  return (
    <div className="bg-card rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        <p className="text-muted-foreground">View and manage your sheet data</p>
      </div>
      
      <div className="p-4 flex flex-col md:flex-row gap-4 justify-between border-b">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search submissions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCcw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={downloadCSV}
            disabled={!data || data.length === 0}
          >
            <Download className="h-4 w-4 mr-1" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="p-8 space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : filteredData.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            {data && data.length > 0 ? 
              "No matching records found. Try a different search term." : 
              "No data available. Start by submitting your first contact form."}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {filteredData[0]?.map((header: string, index: number) => (
                  <TableHead key={index} className="whitespace-nowrap font-bold">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.slice(1).map((row: string[], rowIndex: number) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex} className="overflow-hidden text-ellipsis whitespace-nowrap max-w-xs">
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      
      <div className="p-4 border-t text-muted-foreground text-sm">
        {data && data.length > 0 ? (
          <>Showing {filteredData.length - 1} of {data.length - 1} submissions</>
        ) : (
          <>No data available</>
        )}
      </div>
    </div>
  );
};

export default SheetDataViewer;
