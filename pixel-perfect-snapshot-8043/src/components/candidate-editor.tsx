import { useState, type FormEvent, type ChangeEvent } from 'react';
import { LoaderCircle, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { candidateSchema, type Candidate, type CandidateInput } from '@/lib/candidates';

const blank: CandidateInput = { name: '', party: '', constituency: '', symbol: '', description: '', image: '' };

export function CandidateEditor({ candidate, open, close, save }: { candidate: Candidate | null; open: boolean; close: () => void; save: (input: CandidateInput) => Promise<void> }) {
  const [form, setForm] = useState<CandidateInput>(candidate ?? blank);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(candidate?.image || '');

  // Handle image file upload
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file (JPG, PNG, etc.)');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setForm({ ...form, image: result });
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  async function submit(event: FormEvent) {
    event.preventDefault(); 
    setError('');
    const parsed = candidateSchema.safeParse(form);
    if (!parsed.success) { 
      setError(parsed.error.issues[0]?.message ?? 'Please check all fields.'); 
      return; 
    }
    setBusy(true);
    try { 
      await save(parsed.data); 
      close(); 
    } catch (e) { 
      setError(e instanceof Error ? e.message : 'Unable to save candidate.'); 
    } finally { 
      setBusy(false); 
    }
  }

  return (
    <Dialog open={open} onOpenChange={value => { if (!value && !busy) close(); }}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-32px)] overflow-y-auto">
        <DialogTitle>{candidate ? 'Edit candidate' : 'Add candidate'}</DialogTitle>
        <DialogDescription>Candidate details for the election information directory.</DialogDescription>
        
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {(['name', 'party', 'constituency', 'symbol'] as const).map(key => (
              <label className="form-field" key={key}>
                {({ name: 'Full name', party: 'Political party', constituency: 'Constituency', symbol: 'Election symbol' })[key]}
                <input 
                  required 
                  maxLength={key === 'symbol' ? 50 : 100} 
                  value={form[key]} 
                  onChange={e => setForm({ ...form, [key]: e.target.value })} 
                  placeholder={key === 'constituency' ? 'e.g. Kathmandu - 1' : ''}
                />
              </label>
            ))}
          </div>

          {/* Image Upload Section */}
          <div className="form-field">
            <label htmlFor="image-upload" className="block text-sm font-medium mb-2">
              Candidate Image
            </label>
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-3">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg border-2 border-border"
                />
              </div>
            )}

            {/* File Upload Button */}
            <div className="flex gap-3 items-center">
              <label 
                htmlFor="image-upload" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md cursor-pointer hover:bg-secondary/80 transition-colors"
              >
                <Upload className="size-4" />
                {imagePreview ? 'Change Image' : 'Upload Image'}
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {imagePreview && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setImagePreview('');
                    setForm({ ...form, image: '' });
                  }}
                >
                  Remove
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Upload a JPG, PNG, or other image file (max 5MB)
            </p>
          </div>

          {/* Alternative: Image URL Input */}
          <label className="form-field">
            Or enter Image URL (optional)
            <input 
              type="text" 
              value={form.image.startsWith('data:') ? '' : form.image} 
              onChange={e => {
                setForm({ ...form, image: e.target.value });
                setImagePreview(e.target.value);
              }} 
              placeholder="https://…"
            />
          </label>

          <label className="form-field">
            Description
            <textarea 
              required 
              minLength={10} 
              maxLength={3000} 
              rows={4} 
              value={form.description} 
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </label>

          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={close} disabled={busy}>
              Cancel
            </Button>
            <Button type="submit" disabled={busy}>
              {busy && <LoaderCircle className="animate-spin"/>}
              {busy ? 'Saving…' : 'Save candidate'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
