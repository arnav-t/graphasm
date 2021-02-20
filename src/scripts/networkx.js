export const script = (directed, format, data) => {
  let readCommand = ''
  switch (format) {
  case 'Edge List':
    readCommand = 'G.add_edges_from(data)';
    break;
  case 'Adjacency List':
    readCommand = 'G.add_edges_from(toEdgeList(data))'
    break;
  default:
    readCommand = 'G = nx.from_numpy_matrix(np.asarray(data), create_using=G)'
  }

  const py = `
  import networkx as nx
  __import__('os').environ['MPLBACKEND'] = 'AGG'
  import matplotlib.pyplot as plt
  import numpy as np
  import io, base64

  def toEdgeList(adjl):
    edges = []
    for i, l in enumerate(adjl):
      for j in l:
        edges.append([i, j])
    return edges

  data = ${data} 
  G = nx.${directed ? 'Di' : ''}Graph()
  ${readCommand}
  plt.clf()
  plt.box(False)
  #layout = nx.kamada_kawai_layout(G)
  nx.draw_networkx(G, alpha=1)#, pos=layout)
  buf = io.BytesIO()
  plt.savefig(buf, format='png')
  buf.seek(0)
  'data:image/png;base64,' + base64.b64encode(buf.read()).decode('UTF-8')
  `;
  return py;
};