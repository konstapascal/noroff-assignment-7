export default function formatId(id: string | undefined): string | undefined {
  if (!id) return;
  return id.padStart(3, '0');
}
