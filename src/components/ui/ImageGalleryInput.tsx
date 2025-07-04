import React from 'react';
import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided, DropResult } from 'react-beautiful-dnd';

interface ImageGalleryInputProps {
  images: string[];
  onChange: (images: string[]) => void;
  className?: string;
}

const ImageGalleryInput: React.FC<ImageGalleryInputProps> = ({ images, onChange, className }) => {
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const readers = files.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => resolve(ev.target?.result as string);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(newImages => {
      onChange([...images, ...newImages]);
    });
  };

  const handleRemove = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(images);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    onChange(reordered);
  };

  return (
    <div className={className}>
      <input type="file" accept="image/*" multiple onChange={handleFiles} className="mb-2" />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="gallery" direction="horizontal">
          {(provided: DroppableProvided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="flex gap-2 overflow-x-auto">
              {images.map((img, idx) => (
                <Draggable key={img} draggableId={img} index={idx}>
                  {(prov: DraggableProvided) => (
                    <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps} className="relative group">
                      <img src={img} alt={`Gallery ${idx}`} className="h-20 w-32 object-cover rounded shadow border-2 border-gray-200" />
                      <button type="button" onClick={() => handleRemove(idx)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-80 hover:opacity-100">&times;</button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImageGalleryInput; 